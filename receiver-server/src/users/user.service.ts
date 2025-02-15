import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PrimaryUser } from '../schema/users.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(PrimaryUser.name) private readonly userModel:Model<PrimaryUser>
    ){}


    async createUser(payload: UserDTO): Promise<PrimaryUser> {
        try {
          const response = await this.userModel.create(payload);
    
          return response ? response as PrimaryUser : null;
        } catch (error) {
          console.error(`Somwthing went wrong at database end`, error.message);
          return null;
        }
      }
    
      async getByEmail(email: string): Promise<PrimaryUser> {
        try {
          const response = await this.userModel.findOne({ email }, { __v: 0 });
    
          return response ? response as PrimaryUser : null;
        } catch (error) {
          console.error(`Somwthing went wrong at database end`, error.message);
          return null;
        }
      }
}
