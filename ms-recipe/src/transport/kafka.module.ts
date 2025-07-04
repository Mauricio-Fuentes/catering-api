import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name:'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'recipes',
                        brokers: ['kafka:9092'],
                    },
                    consumer: {
                        groupId: 'recipe-consumer',
                    },
                }
            }
        ]),
    ],
})
export class KafkaModule {}
