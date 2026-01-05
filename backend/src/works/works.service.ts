import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travail } from './entities/travail.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Travail)
    private readonly travailRepo: Repository<Travail>,
  ) {}

  async createWork(dto: CreateWorkDto, formateurId: number) {
    if (new Date(dto.date_fin) <= new Date(dto.date_debut)) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    const travail = this.travailRepo.create({
      ...dto,
      createurId: formateurId,
    });
    return await this.travailRepo.save(travail);
  }

  async findAllByEspace(espaceId: number) {
    // Cette ligne ne donnera plus d'erreur après la mise à jour de l'entité
    return await this.travailRepo.find({
      where: { espaceId, est_actif: 1 },
      order: { date_fin: 'ASC' },
    });
  }

  async findOne(id: number) {
    const travail = await this.travailRepo.findOne({
      where: { id },
      relations: ['livraisons', 'livraisons.evaluation'],
    });
    if (!travail) throw new NotFoundException(`Travail #${id} non trouvé`);
    return travail;
  }

  async update(id: number, dto: UpdateWorkDto) {
    const travail = await this.findOne(id);
    
    // Fusionner les modifications
    Object.assign(travail, dto);

    // Validation des dates si elles sont modifiées
    if (travail.date_fin <= travail.date_debut) {
      throw new BadRequestException('La date de fin doit être supérieure à la date de début');
    }

    return await this.travailRepo.save(travail);
  }

  async remove(id: number) {
    const travail = await this.findOne(id);
    // Au lieu de supprimer, on désactive souvent (Soft Delete)
    travail.est_actif = 0;
    return await this.travailRepo.save(travail);
  }
}