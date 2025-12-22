import { PartialType } from '@nestjs/mapped-types';
import { CreatePromotionDto } from './create-promotion.dto';

/**
 * Le PartialType reprend toutes les validations (@IsString, @IsDateString, etc.)
 * de CreatePromotionDto mais ajoute dynamiquement @IsOptional() à chaque champ.
 */
export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}