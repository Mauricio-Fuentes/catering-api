import { Module } from '@nestjs/common';
import { PlanTypeService } from './plan-type.service';
import { PlanTypeController } from './plan-type.controller';

@Module({
  controllers: [PlanTypeController],
  providers: [PlanTypeService],
})
export class PlanTypeModule {}
