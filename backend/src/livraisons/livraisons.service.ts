import { BadRequestException,  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livraison, StatutLivraison } from '../entities/livraison.entity';
import { Group } from 'src/entities/group.entity';
import { Travail, TravailType } from 'src/entities/travail.entity';
import { Affectation } from 'src/entities/affectation.entity';
import { CreateLivraisonDto } from './dto/create-livraison.dto';

@Injectable()
export class LivraisonsService {
constructor(
    @InjectRepository(Livraison)
    private readonly livraisonRepo: Repository<Livraison>,
    @InjectRepository(Travail)
    private readonly travailRepo: Repository<Travail>,
    @InjectRepository(Affectation)
    private readonly affectationRepo: Repository<Affectation>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async rendreTravail(etudiantId: number, travailId: number, dto: CreateLivraisonDto) {
    // 1. Récupérer le travail et ses conditions
    const travail = await this.travailRepo.findOne({ where: { id: travailId } });
    if (!travail) throw new NotFoundException("Travail introuvable.");

    let affectationAssociee: Affectation | undefined = undefined;
    let groupeAssocie: Group | undefined = undefined;

    // 2. Vérifier l'éligibilité selon le type (INDIVIDUEL ou COLLECTIF)
    if (travail.type_travail === TravailType.INDIVIDUEL) {
      const aff = await this.affectationRepo.findOne({
        where: { travail: { id: travailId }, etudiant: { id: etudiantId }, est_supprime: 0 }
      });
      if (!aff) throw new BadRequestException("Vous n'êtes pas affecté à ce travail individuel.");
      affectationAssociee = aff;
    } 
    else if (travail.type_travail === TravailType.COLLECTIF) {
      // Trouver le groupe lié à ce travail dont l'étudiant est membre
      const group = await this.groupRepo.createQueryBuilder('group')
        .innerJoin('membre_groupe', 'm', 'm.group_id = group.id')
        .where('group.travail_id = :tId AND m.etudiantId = :eId', { tId: travailId, eId: etudiantId })
        .getOne();

      if (!group) throw new BadRequestException("Vous ne faites partie d'aucun groupe pour ce projet.");
      groupeAssocie = group;
    }

    // 3. Déterminer le statut (LIVRE ou EN_RETARD)
    const dateActuelle = new Date();
    const dateFinTravail = new Date(travail.date_fin);
    const statut = dateActuelle > dateFinTravail ? StatutLivraison.EN_RETARD : StatutLivraison.LIVRE;

    // 4. Créer et sauvegarder la livraison
    const nouvelleLivraison = this.livraisonRepo.create({
      contenu: dto.contenu,
      fichierUrl: dto.fichierUrl,
      affection: affectationAssociee, // Nom de la relation dans votre entité Livraison
      groupe: groupeAssocie,
      statut: statut
    });

    return await this.livraisonRepo.save(nouvelleLivraison);
  }
}