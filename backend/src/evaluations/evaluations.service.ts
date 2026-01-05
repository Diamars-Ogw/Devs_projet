import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepo: Repository<Evaluation>,
  ) {}

  // Correction : Accepte 2 arguments (Image 3)
  async create(dto: any, formateurId: number) {
    const evaluation = this.evaluationRepo.create({
      ...dto,
      formateur_id: formateurId
    });
    return await this.evaluationRepo.save(evaluation);
  }

  async update(id: number, dto: any) {
    const evaluation = await this.evaluationRepo.preload({ id, ...dto });
    if (!evaluation) throw new NotFoundException(`Évaluation #${id} introuvable`);
    return await this.evaluationRepo.save(evaluation);
  }

  async getTrainerAverage(formateurId: number) {
    const res = await this.evaluationRepo.createQueryBuilder('e')
      .where('e.formateur_id = :formateurId', { formateurId })
      .select('AVG(e.note)', 'avg')
      .getRawOne();
    return parseFloat(res.avg) || 0;
  }

  async calculateAverageBySpace(spaceId: number) {
    const res = await this.evaluationRepo.createQueryBuilder('e')
      .innerJoin('e.livraison', 'l')
      .innerJoin('l.affectation', 'a')
      .where('a.travail_id IN (SELECT id FROM travail WHERE espace_id = :spaceId)', { spaceId })
      .select('AVG(e.note)', 'avg')
      .getRawOne();
    return parseFloat(res.avg) || 0;
  }

  async findAllByWork(workId: number) {
    return await this.evaluationRepo.find({
      where: { livraison: { affectation: { travailId: workId } } },
      relations: ['livraison']
    });
  }
}