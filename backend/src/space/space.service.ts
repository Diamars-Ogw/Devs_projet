import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compte, RoleUtilisateur } from 'src/entities/compte.entity';
import { EspacePedagogique } from 'src/entities/espace-pedagogique.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(EspacePedagogique)
    private readonly espaceRepo: Repository<EspacePedagogique>,
    ) {}
  
    async findSpaceByUser(user:any){
        if(
          user.role===RoleUtilisateur.ETUDIANT
        ){
          return this.espaceRepo.find({
            where:{
            inscriptions:{
            etudiant:{
              compte:{id: user.compteId}      
              }
            }
            },
            relations:['matiere','formateur','promotion']
        });

        }
        if(
          user.role===RoleUtilisateur.FORMATEUR
        ){
          return this.espaceRepo.find({
            where:{
            formateur:{
              compte:{id: user.compteId}      
              }
            },
            relations:['matiere','promotion']
        });

        }
        return this.espaceRepo.find({
          relations:['matiere','formateur','promotion','inscriptions.etudiant','inscriptions.etudiant.compte']
        });
        
      }
}
 