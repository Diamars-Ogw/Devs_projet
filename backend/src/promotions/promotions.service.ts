import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity.js';
import { CreatePromotionDto } from './dto/create-promotion.dto.js';
import { UpdatePromotionDto } from './dto/update-promotion.dto.js';

@Injectable()
export class PromotionsService {
  async remove(id: number): Promise<void> {
    const result = await this.promotionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion avec ID ${id} non trouvée.`);
    }
  }
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>, // Utilisation de readonly : bonne pratique
  ) {}

  async create(dto: CreatePromotionDto): Promise<Promotion> {
    // 1. Validation de la cohérence des dates
    // On transforme les strings en objets Date pour comparer
    const dateDebut = new Date(dto.dateDebut);
    const dateFin = new Date(dto.dateFin);

    if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime())) {
      throw new BadRequestException('Format de date invalide.');
    }

    if (dateFin <= dateDebut) {
      throw new BadRequestException(
        'La date de fin doit être strictement supérieure à la date de début.',
      );
    }

    // 2. Vérification d'unicité (Le code de promotion doit être unique)
    // On utilise 'exists' ou un select réduit pour la performance
    const codeExiste = await this.promotionRepository.findOne({
      where: { code: dto.code },
      select: ['id'],
    });

    if (codeExiste) {
      throw new ConflictException(
        `Le code de promotion "${dto.code}" est déjà utilisé.`,
      );
    }

    // 3. Sauvegarde sécurisée
    try {
      // .create() prépare l'objet mais ne touche pas à la BDD
      const nouvellePromotion = this.promotionRepository.create(dto);

      // .save() insère réellement dans SQLite
      return await this.promotionRepository.save(nouvellePromotion);
    } catch (error) {
      // Log de l'erreur en console pour le développeur
      console.error('Erreur SQLite:', error);
      throw new InternalServerErrorException(
        "Impossible d'enregistrer la promotion en base de données.",
      );
    }
  }

  // MODIFICATION
  async update(id: number, updateDto: UpdatePromotionDto): Promise<Promotion> {
    // 1. On vérifie si elle existe
    const promotion = await this.promotionRepository.preload({
      id: id,
      ...updateDto,
    });

    if (!promotion) {
      throw new NotFoundException(
        `La promotion avec l'ID #${id} n'existe pas.`,
      );
    }

    // 2. Validation des dates si elles sont modifiées
    if (updateDto.dateDebut && updateDto.dateFin) {
      if (new Date(updateDto.dateFin) <= new Date(updateDto.dateDebut)) {
        throw new BadRequestException(
          'La date de fin doit être après la date de début.',
        );
      }
    }

    return this.promotionRepository.save(promotion);
  }

  async findAll(): Promise<Promotion[]> {
    try {
      return await this.promotionRepository.find({
        order: {
          anneeAcademique: 'DESC', // Plus logique pour un gestionnaire
          nom: 'ASC',
        },
      });
    } catch (error) {
      console.error('Erreur findAll:', error);
      throw new InternalServerErrorException(
        'Erreur lors de la récupération des promotions.',
      );
    }
  }
}
