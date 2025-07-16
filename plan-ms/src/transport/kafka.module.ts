import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'plans',
                        brokers: ['kafka:9092']
                    },
                    consumer: {
                        groupId: 'plans-consumer-group'
                    }
                }
            }
        ])
    ]
})
export class KafkaModule {}
