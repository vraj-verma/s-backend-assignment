import { Controller, HttpException, HttpStatus, Get, } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDTO } from './dto/user.dto';
@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService
  ) { }


  @MessagePattern('user-registered')
  async addUser(
    @Payload() payload: UserDTO
  ) {

    payload.modifiedAt = new Date().toISOString();

    const response = await this.appService.createUser(payload);

    if (!response) {
      throw new HttpException(
        `Failed to add user in database, please try again`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    console.info('Data added..')

    return {
      status: true,
      response
    };

  }

}
