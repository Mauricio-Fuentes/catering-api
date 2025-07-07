import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [NatsModule]
})
export class ClientsModule {}
