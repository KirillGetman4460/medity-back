import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DateType = {
  startDate: string;
  endDate: string;
};

@Schema()
export class Date{
  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;
}

export const DateSchema = SchemaFactory.createForClass(Date);

@Schema({
  timestamps: true,
})
export class Payment extends Document {
  @Prop({required:true})
  currentDate:string

  @Prop({ required: true })
  orderId: string;

  @Prop({ default: 'wait' })
  statusPayment: string;

  @Prop({ required: true })
  userId: string;

  @Prop({required:true})
  interestRate:string

  @Prop({ required: true, type: [DateSchema] })
  date: DateType[];

  @Prop({required: true})
  tariff: string

  @Prop({ default:'' })
  price: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);