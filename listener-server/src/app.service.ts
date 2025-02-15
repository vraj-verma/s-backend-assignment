import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SecondaryUser } from './schema/users.schema';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class AppService {


  constructor(
    @InjectModel(SecondaryUser.name) private readonly userModel: Model<SecondaryUser>
  ) { }


  async createUser(payload: UserDTO): Promise<SecondaryUser> {
    try {
      const response = await this.userModel.create(payload);

      return response ? response as SecondaryUser : null;
    } catch (error) {
      console.error(`Somwthing went wrong at database end`, error.message);
      return null;
    }
  }

}
