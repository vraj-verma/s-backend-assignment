import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from './dto/user.dto';
import { UsersService } from './user.service';
import { UserAddProducerQueue } from '../queue/producers/user-add.producer';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly userAddProducerQueue: UserAddProducerQueue,
  ) { }


  @Post()
  async addUser(
    @Res() res: Response,
    @Body() payload: UserDTO
  ) {

    const isAlreadyExist = await this.usersService.getByEmail(payload.email);

    if (isAlreadyExist) {
      throw new HttpException(
        `User with emial: ${payload.email} already exists`,
        HttpStatus.CONFLICT
      );
    }

    const response = await this.usersService.createUser(payload);


    if (!response) {
      throw new HttpException(
        `Failed to add user, pelase try again`,
        HttpStatus.NOT_IMPLEMENTED
      );
    }

    payload.insertedAt = response.insertedAt;

    await this.userAddProducerQueue.userAddNotification(payload);

    res.status(201).json({
      sttaus: true,
      response
    });

  }
}
