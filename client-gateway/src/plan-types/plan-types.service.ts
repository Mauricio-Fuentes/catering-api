import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Injectable()
export class PlanTypesService {
  private readonly logger = new Logger(PlanTypesService.name);

  constructor(
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy
  ){}

  create(createPlanTypeDto: CreatePlanTypeDto) {
    return this.clientNats.send("createPlanType", createPlanTypeDto);
  }

  findAll(paginationDto: PaginationDto) {
    return this.clientNats.send("getPlanTypes", paginationDto);
  }

  findOne(id: number) {
    return this.clientNats.send("getPlanTypeId", {id});
  }

  update(id: number, updatePlanTypeDto: UpdatePlanTypeDto) {
    return `This action updates a #${id} planType`;
  }

  remove(id: number) {
    return `This action removes a #${id} planType`;
  }
}
