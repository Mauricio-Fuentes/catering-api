import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @MessagePattern('createPlan')
  create(@Payload() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @MessagePattern('findAllPlans')
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.plansService.findAll(paginationDto);
  }

  @MessagePattern('findOnePlan')
  findOne(@Payload('id') id: number) {
    return this.plansService.findOne(id);
  }

  @MessagePattern('updatePlan')
  update(@Payload() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(updatePlanDto);
  }

  @MessagePattern('removePlan')
  remove(@Payload('id') id: number) {
    console.log(id);
    
    return this.plansService.remove(id);
  }
}
