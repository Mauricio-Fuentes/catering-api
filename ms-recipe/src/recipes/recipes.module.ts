import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [RecipesController],
  providers: [RecipesService],
  imports: [NatsModule],
})
export class RecipesModule {}
