import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDTO } from '../users/dto/user.dto';
import { retry, catchError, EMPTY } from 'rxjs';



@Injectable()
export class BrokerService {

    constructor(
        @Inject('RABBITMQ_CLIENT') private readonly client: ClientProxy,
    ) { }

    async sendUserAddMessage(payload: UserDTO): Promise<any> {

        console.log('job arrived in rabbit');

        return this.client
            .emit('user-registered', payload)
            .pipe(
                retry(2),
                catchError((error) => {
                    console.error('Event not sent to rabbit:', error);
                    return EMPTY;
                })
            );

    }

    async onModuleInit() {
        await this.client.connect();
    }
}
