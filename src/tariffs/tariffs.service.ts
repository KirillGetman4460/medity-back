
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from '../auth/schemas/users.schema'
import { Tariff, TariffDocument } from './schemas/tariff.schema';

@Injectable()
export class TariffsService {
  constructor(
    @InjectModel(User.name) private userModel:Model<User>,  
    @InjectModel(Tariff.name) private tariffModel: Model<TariffDocument>,
  ) {}

  async findAll(): Promise<Tariff[]> {
    return this.tariffModel.find().exec();
  }

  async create(tariff: Tariff): Promise<Tariff> {
    const createdTariff = new this.tariffModel(tariff);
    return createdTariff.save();
  }
}