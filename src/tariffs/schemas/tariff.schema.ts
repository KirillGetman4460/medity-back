import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TariffDocument = Tariff & Document;

const TariffType = {
  userId: String,
  tariffId: String, 
  name: String,
  interestRate: Number, 
  term: Number,
  minAmount: Number, 
  maxAmount: Number, 
  description: String,  
  active:Boolean
};

const values = {
  userId: '',
  tariffId: '', 
  name: '',
  interestRate: 0, 
  term: 0,
  minAmount: 0, 
  maxAmount: 0, 
  description: '',  
  active: false,

};

@Schema()
export class Tariff {
  @Prop()
  userId: string;

  @Prop({ type: [TariffType], default: [values] })
  tariffs: [];
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);