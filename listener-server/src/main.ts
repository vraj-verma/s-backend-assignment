import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const RMQ_URL = configService.get<string>('RABBIT_URL');
  const QUEUE_NAME = configService.get<string>('RABBIT_NAME');
  const PORT = configService.get<string>('PORT');

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
      socketOptions: {
        heartbeat: 30, 
        connection_timeout: 3000
      }
    },
  });

  await microservice.listen();
  console.info(`Listener appliction is connected to queue: ${QUEUE_NAME}, and running on port: ${PORT}`);
}
bootstrap();
