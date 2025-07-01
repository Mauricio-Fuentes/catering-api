import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NatsModule } from './transports/nats.module';
import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { KafkaModule } from './transports/kafka.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    ProductsModule,
    NatsModule,
    AuthModule,
    HealthCheckModule,
    RecipesModule,
  ],
})
export class AppModule {}
