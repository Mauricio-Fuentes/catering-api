import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanTypeService } from './plan-type.service';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';

@Controller('plan-type')
export class PlanTypeController {
  constructor(private readonly planTypeService: PlanTypeService) {}

  @Post()
  create(@Body() createPlanTypeDto: CreatePlanTypeDto) {
    return this.planTypeService.create(createPlanTypeDto);
  }

  @Get()
  findAll() {
    return this.planTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTypeService.findOne(+id);
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
