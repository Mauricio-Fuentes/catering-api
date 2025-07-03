import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';
import { PrismaClient } from '@prisma/client';
import { PlantType } from '../../generated/prisma/index';

@Injectable()
export class PlanTypeService extends PrismaClient implements OnModuleInit {

  constructor(){
    super();
  }
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('DataBase connected');
  }

  async create(createPlanTypeDto: CreatePlanTypeDto) {
    const planType = await this.PlantType.create({
      data: {
        
      }
    });
    return 'This action adds a new planType';
  }

  findAll() {
    return `This action returns all planType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planType`;
  }

  update(id: number, updatePlanTypeDto: UpdatePlanTypeDto) {
    return `This action updates a #${id} planType`;
  }

  remove(id: number) {
    return `This action removes a #${id} planType`;
  }
}
