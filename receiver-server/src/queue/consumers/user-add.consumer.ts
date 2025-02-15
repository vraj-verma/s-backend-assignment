import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { BrokerService } from "../../broker/rabbit.service";

@Processor('user-notification-queue')
export class UserAddConsumerQueue {

    constructor(
        private readonly brokerService: BrokerService
    ) { }

    @Process('user-add')
    async processUserAddEvent(job: Job) {
        const { data } = job;

        await this.brokerService.sendUserAddMessage(data);

        console.log('job pushed to rabbit')

        return true;
    }

}
