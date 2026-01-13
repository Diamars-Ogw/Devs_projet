import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Travail } from '../entities/travail.entity';
import { InscriptionEtudiant } from '../entities/inscription-etudiant.entity';
import { StudentsService } from '../students/students.service';
import { EspacePedagogique } from 'src/entities/espace-pedagogique.entity';
import { RoleUtilisateur } from 'src/entities/compte.entity';

@Injectable()
export class TravauxService {
  constructor(
    @InjectRepository(Travail)
    private travailRepo: Repository<Travail>,
  ) {}
  async findMyAssignments(user:any){
    return this.travailRepo.find({
      where:{
        espaces:{
          inscriptions:{
            etudiant:{
              compte:{id:user.compteId}
            }
          }
        },
      },
      relations:['espaces','espaces.matiere','createur'],
      order:{date_fin:'ASC'},
    })
  }
}
