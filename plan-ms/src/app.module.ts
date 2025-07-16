import { Module } from '@nestjs/common';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [PlansModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
