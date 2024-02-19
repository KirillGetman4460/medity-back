
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from '../auth/schemas/users.schema'
import { Tariff, TariffDocument } from './schemas/tariff.schema';

import { Request } from 'express';


@Injectable()
export class TariffsService {
  constructor(
    @InjectModel(User.name) private userModel:Model<User>,  
    @InjectModel(Tariff.name) private tariffModel: Model<TariffDocument>,
  ) {}

  async getAllTariffs(req: Request,userId:string) {

    if (!userId || !req) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkTariffs = await this.tariffModel.findOne({userId:userId})

      if(!checkTariffs){
        return {
          code: 404,
          message: 'Not Found',
        };
      }

      return{
        code:201,
        date:checkTariffs
      }


    } catch (err) {
      console.log(err);
      
      return{
        code:500,
        err
      }
    }
  }
  async deleteTestTariff(userId:string){
    if (!userId) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkTariffs = await this.tariffModel.findOne({userId:userId})

      if(!checkTariffs){
        return {
          code: 404,
          message: 'Not Found',
        };
      }
      
      const filterTariffs = checkTariffs.tariffs.filter(item => String(item.name) !== "Test");
      
      await this.tariffModel.findByIdAndUpdate(
        {userId: userId},
        {tariffs: filterTariffs},
        {new: true}
      );

      return{
        code:201,
        message: 'ok',
      }

    } catch (error) {
      
    }
  }
}