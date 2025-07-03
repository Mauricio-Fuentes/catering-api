import { Module } from '@nestjs/common';
import { PlanTypeModule } from './plan-type/plan-type.module';

@Module({
  controllers: [],
  providers: [],
  imports: [PlanTypeModule],
})
export class AppModule {}
