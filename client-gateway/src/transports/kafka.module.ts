import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
    imports:[
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'gateway-client',
                        brokers: [`${envs.kafkaHost}:${envs.kafkaPort}`], 
                    },
                    consumer: {
                        groupId: 'gateway-consumer',
                    },
                },
            },
        ]),
    ],
    exports: [ClientsModule]
}) 
export class KafkaModule {}
