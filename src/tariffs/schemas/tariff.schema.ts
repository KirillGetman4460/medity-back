import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TariffDocument = Tariff & Document;

@Schema()
export class Tariff {
  @Prop()
  name: string;

  @Prop()
  interestRate: number;

  @Prop()
  term: number;

  @Prop()
  minAmount: number;

  @Prop()
  maxAmount: number;

  @Prop()
  description: string;
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);