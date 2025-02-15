import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MONGO_CONFIG } from './db/db.config';
import { UsersModule } from './users/user.module';
import { QUEUECONFIG } from './queue/config/queue.config';
import { UserAddProducerQueue } from './queue/producers/user-add.producer';
import { UserAddConsumerQueue } from './queue/consumers/user-add.consumer';
import { BrokerService } from './broker/rabbit.service';
import { BrokerModule } from './broker/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...MONGO_CONFIG,
    ...QUEUECONFIG,
    BrokerModule,
    UsersModule
  ],
  providers: [
    UserAddConsumerQueue,
    UserAddProducerQueue,
    BrokerService,
  ]
})
export class AppModule { }
