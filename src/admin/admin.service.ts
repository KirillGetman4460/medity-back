import { Model } from 'mongoose';
import { Role } from 'src/constants/roles';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from '../auth/schemas/users.schema'

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name) 
        private userModule:Model<User>,
    ){}

    getAllUsers(userId:string){
        if(!userId){
            return{
                code: 400,
                message: 'Not all arguments',
            }
        }
        const checkUser = this.userModule.findOne({userId:userId})

        if(!checkUser){
            return{
                code:401,
                message: 'Not found',
            }
        }

        if(checkUser.role === Role.USER){
            
        }
    }
}
