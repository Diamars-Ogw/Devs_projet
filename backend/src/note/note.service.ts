import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Livraison } from 'src/entities/livraison.entity';

import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Livraison)
    private readonly livraisonRepo: Repository<Livraison>,
  ) {}

  async obtenirMesEvaluations(etudiantId: number) {
    console.log("ID reçu par le service :", etudiantId);
    return await this.livraisonRepo.createQueryBuilder('livraison')
      // 1. Joindre les relations pour identifier le travail
      .leftJoinAndSelect('livraison.affection', 'affection')
      .leftJoinAndSelect('livraison.groupe', 'groupe')
      .leftJoinAndSelect('affection.travail', 'travailIndiv')
      .leftJoinAndSelect('groupe.travail', 'travailGrp')
      
      // 2. Joindre la table évaluation (la note)
      // On utilise leftJoin car un travail peut être rendu mais pas encore noté
      .leftJoinAndMapOne(
        'livraison.evaluation', 
        'evaluation', 
        'eval', 
        'eval.livraison_id = livraison.id'
      )
      
      // 3. Filtrage : Livraisons de l'étudiant ou de son groupe
      .where('affection.etudiant_id = :id', { id: etudiantId })
      .orWhere((qb) => {
        const subQuery = qb.subQuery()
          .select('mg.groupe_id')
          .from('membre_groupe', 'mg')
          .where('mg.etudiant_id = :id', { id: etudiantId })
          .getQuery();
        return 'livraison.groupe_id IN ' + subQuery;
      })
      .orderBy('livraison.created_at', 'DESC')
      .getMany();
  }
}