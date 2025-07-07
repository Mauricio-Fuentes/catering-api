import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanTypeService } from './plan-type.service';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from './dto/PaginationDto';

@Controller('plan-type')
export class PlanTypeController {
  constructor(private readonly planTypeService: PlanTypeService) {}

  @MessagePattern('createPlanType')
  create(@Payload() createPlanTypeDto: CreatePlanTypeDto) {
    return this.planTypeService.create(createPlanTypeDto);
  }

  @MessagePattern('getPlanTypes')
  findAll(@Payload() query: PaginationDto) {
    return this.planTypeService.findAll(query);
  }

  @MessagePattern('getPlanTypeId')
  findOne(@Payload() id: any) {
    return this.planTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanTypeDto: UpdatePlanTypeDto) {
    return this.planTypeService.update(+id, updatePlanTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTypeService.remove(+id);
  }
}
