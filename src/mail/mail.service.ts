import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import {User} from '../auth/schemas/users.schema'
@Injectable()
export class MailService {
  constructor(
      private readonly mailerService: MailerService,
      @InjectModel(User.name) private userModel:Model<User>,
    ) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
    });
  }

  async verifyUser(token:string){
    
    if(!token){
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkVerifyUser = await this.userModel.findOne({verificationToken:token})
      
    if(!checkVerifyUser){
      return{
        code:404,
        message:"User not found"
      }
    }

    await this.userModel.findOneAndUpdate(
      {verificationToken:token},
      {verification:true}
    )

    return{
      code:201,
      message:"User verification"
    }
    } catch (error) {
      console.log(error);
      
      return{
        code:500,
        message:error
      }
    }
  }
}