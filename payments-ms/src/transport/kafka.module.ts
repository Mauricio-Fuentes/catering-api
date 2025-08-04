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
                        clientId: 'payments',
                        brokers: ['localhost:29092']
                    },
                    consumer: {
                        groupId: 'payment-consumer-group'
                    }
                }
            }
        ])
    ]
})
export class KafkaModule {}
