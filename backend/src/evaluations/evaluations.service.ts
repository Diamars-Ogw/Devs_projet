import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationsService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  async findAll() {
    return this.evaluationRepository.find({
      order: { date_evaluation: 'DESC' },
    });
  }

  async findOne(id: number) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
    });

    if (!evaluation) {
      throw new NotFoundException('Évaluation non trouvée');
    }

    return evaluation;
  }

  async updateByDirector(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const evaluation = await this.findOne(id);

    // Mettre à jour la note et les informations de modification
    evaluation.note = updateEvaluationDto.note;
    evaluation.raison_modification = updateEvaluationDto.raison_modification;
    evaluation.modificateur_id = updateEvaluationDto.modificateur_id;
    evaluation.date_modification = new Date();

    const updated = await this.evaluationRepository.save(evaluation);

    // TODO: Notifier le formateur et l'étudiant
    console.log(`Notification: Évaluation ${id} modifiée par directeur ${updateEvaluationDto.modificateur_id}`);

    return updated;
  }

  async getStatistics() {
    const total = await this.evaluationRepository.count();
    
    const result = await this.evaluationRepository
      .createQueryBuilder('evaluation')
      .select('AVG(evaluation.note)', 'moyenne')
      .getRawOne();

    const moyenne = result?.moyenne ? parseFloat(result.moyenne) : 0;

    // Distribution des notes
    const distribution = await this.evaluationRepository
      .createQueryBuilder('evaluation')
      .select([
        "CASE WHEN note >= 16 THEN '16-20' WHEN note >= 12 THEN '12-15' WHEN note >= 10 THEN '10-11' ELSE '0-9' END as tranche",
        'COUNT(*) as count',
      ])
      .groupBy('tranche')
      .getRawMany();

    return {
      total,
      moyenne: Math.round(moyenne * 100) / 100,
      distribution,
    };
  }

  async getEvaluationHistory(id: number) {
    const evaluation = await this.findOne(id);

    return {
      evaluation,
      modifications: evaluation.date_modification
        ? [
            {
              date: evaluation.date_modification,
              modificateur_id: evaluation.modificateur_id,
              raison: evaluation.raison_modification,
              ancienne_note: null, // Historique complet nécessiterait une table dédiée
              nouvelle_note: evaluation.note,
            },
          ]
        : [],
    };
  }
}