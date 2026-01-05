import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livraison } from './entities/livraison.entity';
import { Travail } from '../works/entities/travail.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Livraison)
    private readonly livraisonRepo: Repository<Livraison>,
    @InjectRepository(Travail)
    private readonly travailRepo: Repository<Travail>,
  ) {}

  async create(dto: any): Promise<Livraison> {
    let travailId: number | undefined;

    if (dto.affectation_id) {
      const res = await this.livraisonRepo.manager.query(
        'SELECT travail_id FROM affectation_individuelle WHERE id = ?', [dto.affectation_id]
      );
      travailId = res[0]?.travail_id;
    } else if (dto.groupe_id) {
      const res = await this.livraisonRepo.manager.query(
        'SELECT travail_id FROM groupe_etudiant WHERE id = ?', [dto.groupe_id]
      );
      travailId = res[0]?.travail_id;
    }

    if (!travailId) throw new BadRequestException("ID de travail introuvable");

    const travail = await this.travailRepo.findOne({ where: { id: travailId } });
    if (!travail) throw new NotFoundException("Travail non trouvé");

    // Détermination automatique du statut (LIVRE ou EN_RETARD)
    const statutFinal = new Date() > new Date(travail.date_fin) ? 'EN_RETARD' : 'LIVRE';

    const nouvelleLivraison: Livraison = this.livraisonRepo.create({
      ...dto,
      statut: statutFinal,
      date_livraison: new Date()
    } as Livraison);
    return await this.livraisonRepo.save(nouvelleLivraison);
  }

  async findAllByWork(workId: number) {
    return await this.livraisonRepo.find({
      where: [{ affectation: { travailId: workId } }, { groupe: { travailId: workId } }],
      relations: ['evaluation']
    });
  }

  async findOne(id: number) {
    return await this.livraisonRepo.findOne({ where: { id }, relations: ['evaluation'] });
  }

  async countPendingSubmissions(formateurId: number): Promise<number> {
    return await this.livraisonRepo.createQueryBuilder('l')
      .leftJoin('l.evaluation', 'e')
      .innerJoin('l.affectation', 'a')
      .innerJoin('a.travail', 't')
      .innerJoin('t.espace', 'esp')
      .where('esp.formateur_id = :formateurId', { formateurId })
      .andWhere('e.id IS NULL')
      .getCount();
  }
}