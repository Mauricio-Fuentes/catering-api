import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanTypesService } from './plan-types.service';
import { CreatePlanTypeDto } from './dto/create-plan-type.dto';
import { UpdatePlanTypeDto } from './dto/update-plan-type.dto';
import { PaginationDto } from 'src/common';

@Controller('plan-types')
export class PlanTypesController {
  constructor(private readonly planTypesService: PlanTypesService) {}

  @Post()
  create(@Body() createPlanTypeDto: CreatePlanTypeDto) {
    return this.planTypesService.create(createPlanTypeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto ) {
    return this.planTypesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanTypeDto: UpdatePlanTypeDto) {
    return this.planTypesService.update(+id, updatePlanTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planTypesService.remove(+id);
  }
}
