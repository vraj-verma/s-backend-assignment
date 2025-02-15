import { BullModule } from "@nestjs/bull";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const QUEUECONFIG = [
    BullModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService): Promise<any> => ({
            redis: {
                host: configService.get<string>('REDIS_URL'),
                port: configService.get<number>('REDIS_PORT'),
                password: configService.get<string>('REDIS_PASS'),
            },
        }),
        inject: [ConfigService],
    }),
    BullModule.registerQueue({
        name: 'user-notification-queue',
    }),
];
