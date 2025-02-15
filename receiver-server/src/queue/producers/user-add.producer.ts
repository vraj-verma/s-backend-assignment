import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class UserAddProducerQueue {
    
    constructor(
        @InjectQueue('user-notification-queue') private queue: Queue
    ) { }

    async userAddNotification(data: any) {

        const job = await this.queue.add(
            'user-add',
            data,
            {
                delay: 60000 
            }
        );

        console.log('job arrived in producer')
        // console.log(await job.finished());

        return job.id;
    }


}