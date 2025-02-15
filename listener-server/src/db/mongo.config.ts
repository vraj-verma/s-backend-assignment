import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SecondaryUser, UserSchema } from "../schema/users.schema"



export const MONGO_CONFIG = [
    MongooseModule.forRootAsync(
        {
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {

                const mongoUrl = configService.get<string>('MONGO_URL');
                const dbName = configService.get<string>('MONGO_DB');
                const maxPoolSize = configService.get<number>('MONGO_MAX_POOL_SIZE');

                if (!mongoUrl) {
                    throw new Error('Mongo DB is not set');
                }

                return {
                    uri: mongoUrl,
                    dbName: dbName,
                    maxPoolSize: maxPoolSize,
                };
            },
            inject: [ConfigService],
        }
    ),
    MongooseModule.forFeature(
        [
            {
                name: SecondaryUser.name,
                schema: UserSchema
            },
        ]
    )
]