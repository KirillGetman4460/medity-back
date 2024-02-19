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
};

@Schema()
export class Tariff {
  @Prop()
  userId: string;

  @Prop([TariffType])
  tariffs: typeof TariffType[];
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);