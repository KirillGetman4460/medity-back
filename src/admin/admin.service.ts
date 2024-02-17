import { Model } from 'mongoose';
import { Role } from 'src/constants/roles';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from '../auth/schemas/users.schema'

@Injectable()
export class AdminService {
    // constructor(
    //     @InjectModel(User.name) private userModel: Model<User>,
    // ){}

    // getAllUsers(userId:string){
    //     if(!userId){
    //         return{
    //             code: 400,
    //             message: 'Not all arguments',
    //         }
    //     }
    //     const checkUser = this.userModel.findOne({userId:userId})
    //     console.log(checkUser);
        
    //     if(!checkUser){
    //         return{
    //             code:401,
    //             message: 'Not found',
    //         }
    //     }

    //     try {
    //             const result = this.userModel.find().exec();
    
    //             return {
    //                 code:201,
    //                 data:result
    //             }
            
    //         // return{
    //         //     code:403,
    //         //     message:"You don't have access"
    //         // }
    //     } catch (err) {
    //         console.log(err);
            
    //         return{
    //             code:500,
    //             message:"Internal server error"
    //         }
    //     }
    // }

    
}
