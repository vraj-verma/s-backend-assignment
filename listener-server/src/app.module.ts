import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MONGO_CONFIG } from './db/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...MONGO_CONFIG
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
