import { Module } from '@nestjs/common';

import { MONGO_CONFIG } from '../db/db.config';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserAddProducerQueue } from '../queue/producers/user-add.producer';
import { QUEUECONFIG } from '../queue/config/queue.config';

@Module({
  imports: [
    ...MONGO_CONFIG,
    ...QUEUECONFIG,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserAddProducerQueue],
})
export class UsersModule {}
