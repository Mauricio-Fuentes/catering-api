import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE } from 'src/config';

@Injectable()
export class KafkaService implements OnModuleInit {
    constructor(@Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka) {}

    onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('createPayment');
        this.kafkaClient.subscribeToResponseOf('findAllPayments');
        this.kafkaClient.subscribeToResponseOf('createPlan');
        this.kafkaClient.subscribeToResponseOf('findAllPlans');
        this.kafkaClient.connect().then(() => {
            console.log('Kafka client connected');
        }).catch(err => {
            console.error('Error connecting to Kafka:', err);
        });
    }

    getClient(): ClientKafka {
        return this.kafkaClient;
    }
    
}
