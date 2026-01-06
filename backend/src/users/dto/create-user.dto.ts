import { IsEmail, IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { UserRole } from '../entities/compte.entity';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsString()
  @IsOptional()
  telephone?: string;

  // Champs spécifiques FORMATEUR
  @IsString()
  @IsOptional()
  specialite?: string;

  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  departement?: string;

  @IsString()
  @IsOptional()
  bureau?: string;

  // Champs spécifiques ETUDIANT
  @IsString()
  @IsOptional()
  matricule?: string;

  @IsNumber()
  @IsOptional()
  promotion_id?: number;

  @IsDateString()
  @IsOptional()
  date_naissance?: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @IsOptional()
  annee_inscription?: number;

  // Champs spécifiques TECHNICIEN
  @IsString()
  @IsOptional()
  service?: string;

  @IsString()
  @IsOptional()
  poste?: string;

  @IsString()
  @IsOptional()
  permissions_speciales?: string;
}