import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/users.schema';
@Injectable()
export class AdminService {
    // constructor(
    //     @InjectModel(User.name) 
    //     private userModel:Model<User>,
    // ){}

}

