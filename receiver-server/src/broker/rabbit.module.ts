import { Module } from '@nestjs/common';
import { BrokerService } from './rabbit.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  providers: [BrokerService,
        {
            provide: 'RABBITMQ_CLIENT',
            useFactory: (configService: ConfigService) => {
                const rmqUrl = configService.get<string>('RABBIT_URL');
                const rmqQueue = configService.get<string>('RABBIT_NAME');
                const client = ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [rmqUrl],
                        queue: rmqQueue,
                        queueOptions: {
                            durable: false,
                        },
                    },
                });

                // Connect to RabbitMQ immediately
                client.connect()
                    .then(() => console.log('RabbitMQ connected successfully'))
                    .catch((err) => console.error('Error connecting to RabbitMQ:', err));

                return client;
            },
            inject: [ConfigService],
        },
  ],
  exports: [BrokerService, 'RABBITMQ_CLIENT']
})
export class BrokerModule { }
