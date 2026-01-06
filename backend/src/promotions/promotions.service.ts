import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async create(createPromotionDto: CreatePromotionDto) {
    // Vérifier si le code existe déjà
    const existing = await this.promotionRepository.findOne({
      where: { code: createPromotionDto.code },
    });

    if (existing) {
      throw new BadRequestException('Ce code de promotion existe déjà');
    }

    // Vérifier que date_fin > date_debut
    if (new Date(createPromotionDto.date_fin) <= new Date(createPromotionDto.date_debut)) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async findAll() {
    return this.promotionRepository
      .createQueryBuilder('promotion')
      .leftJoinAndSelect('promotion.etudiants', 'etudiants')
      .leftJoinAndSelect('promotion.espaces', 'espaces')
      .loadRelationCountAndMap('promotion.nombreEtudiants', 'promotion.etudiants')
      .loadRelationCountAndMap('promotion.nombreEspaces', 'promotion.espaces')
      .orderBy('promotion.created_at', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepository
      .createQueryBuilder('promotion')
      .leftJoinAndSelect('promotion.etudiants', 'etudiants')
      .leftJoinAndSelect('promotion.espaces', 'espaces')
      .where('promotion.id = :id', { id })
      .getOne();

    if (!promotion) {
      throw new NotFoundException('Promotion non trouvée');
    }

    return promotion;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    const promotion = await this.findOne(id);

    // Vérifier le code si modifié
    if (updatePromotionDto.code && updatePromotionDto.code !== promotion.code) {
      const existing = await this.promotionRepository.findOne({
        where: { code: updatePromotionDto.code },
      });

      if (existing) {
        throw new BadRequestException('Ce code de promotion existe déjà');
      }
    }

    // Vérifier les dates si modifiées
    const dateDebut = updatePromotionDto.date_debut
      ? new Date(updatePromotionDto.date_debut)
      : promotion.date_debut;
    const dateFin = updatePromotionDto.date_fin
      ? new Date(updatePromotionDto.date_fin)
      : promotion.date_fin;

    if (dateFin <= dateDebut) {
      throw new BadRequestException('La date de fin doit être après la date de début');
    }

    Object.assign(promotion, updatePromotionDto);
    return this.promotionRepository.save(promotion);
  }

  async remove(id: number) {
    const promotion = await this.findOne(id);
    await this.promotionRepository.remove(promotion);
    return { message: 'Promotion supprimée avec succès' };
  }

  async getStatistics() {
    const total = await this.promotionRepository.count();
    const active = await this.promotionRepository.count({ where: { est_active: true } });
    const inactive = await this.promotionRepository.count({ where: { est_active: false } });

    return {
      total,
      active,
      inactive,
    };
  }

  async getPromotionStudents(id: number) {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
      relations: ['etudiants', 'etudiants.compte'],
    });

    if (!promotion) {
      throw new NotFoundException('Promotion non trouvée');
    }

    return promotion.etudiants;
  }
}