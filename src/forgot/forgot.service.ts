import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '../auth/schemas/users.schema'
import { Repository } from 'typeorm';
import { Forgot } from './schemas/forgot.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateForgotDto } from './dto/update-forgot.dto';
import generateTemporaryPassword from 'src/methods/generateTemporaryPassword';
import generateRandomCode from '../methods/generateRandomCode'

const bcrypt = require('bcryptjs');

@Injectable()
export class ForgotService {
    constructor(@InjectModel(User.name) private usersModule:Model<User>, @InjectModel(Forgot.name) private forgotModel:Model<Forgot>){}

    async checkEmail(name: string,data: UpdateForgotDto){
        
        if (!name) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }

        try {
            const checkUser = await this.usersModule.findOne(
               { name: name },
            );
            // console.log(checkUser);
            
            if (!checkUser) {
              return {
                code: 404,
                message: 'Not found',
              };
            }
      
            const checkForgot = await this.forgotModel.findOne({
              userId: checkUser.userId,
            });
            
            
            if (checkForgot) {
                await this.usersModule.findOneAndUpdate(
                    { _id: checkUser._id },
                    {
                      email: data.newEmail,
                    },
                  );
                  return {
                    code: 200,
                    message: 'ok',
                  };
            } else {
            //   await this.forgotModel.create({ userId: checkUser.userId, code: code });
      
            //   return {
            //     code: 200,
            //     message: 'ok',
            //   };
            }
          } catch (err) {
            return {
              code: 500,
              message: err,
            };
          }
    }

    async resetPassword(userId: string, newPassword:string) {

        if (!userId || !newPassword) {
          return {
            code: 400,
            message: 'Not all arguments',
          };
        }
    
        try {
          const checkForgot = await this.usersModule.findOne({ userId: userId });
        
          if (!checkForgot) {
            return {
              code: 404,
              message: 'Not found',
            };
          }
    
          await this.usersModule.updateOne(
            { userId: userId },
            { password: bcrypt.hashSync(newPassword) },
          );
    
          await this.forgotModel.findOneAndDelete({ _id: checkForgot._id });
    
          return {
            code: 200,
            message: 'ok',
          };
        } catch (err) {
          return {
            code: 500,
            message: err,
          };
        }
    }
}
