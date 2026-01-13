import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Etudiant } from "src/entities/etudiant.entity";
import { Promotion } from "src/entities/promotion.entity";
import { Repository } from "typeorm";

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion)
        private readonly promoRepo: Repository<Promotion>,
        @InjectRepository(Etudiant)
        private readonly etudiantRepo: Repository<Etudiant>,
    ) {}
    
    async create(data: Partial<Promotion>){
        const exist = await this.promoRepo.findOne({
            where: { nom:data.nom },
        });
    
        if (exist) throw new NotFoundException('Promotion déjà existante');
        return this.promoRepo.save(this.promoRepo.create(data));
    
    }
      
    findAll(){
        return this.promoRepo.find({relations:['etudiant']});
    }
    
    async assignStudent(promoId:number, etudiantId:number){
        const promo = await this.promoRepo.findOne({
            where: {id:promoId},
            relations:['etudiant'],
        });
        if (!promo) throw new NotFoundException('Promotion introuvable');
        
        const etudiant=await this.etudiantRepo.findOne({
            where:{id:etudiantId},
        })
    
        if (!etudiant) throw new NotFoundException('etudiant introuvable');
        
        promo.etudiant.push(etudiant);
    
        return this.promoRepo.save(promo);
    
    }
}
