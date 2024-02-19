import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tariff } from '../../tariffs/schemas/tariff.schema';
import { Role } from '../../constants/roles';

export type TariffType = {
    name:String,
    term:String,
    price:String,
    startDate: string;
    endDate: string;
};

@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Role.USER })
  role: string;

//   @Prop({ type: [Tariff] })
//   tariffs: TariffType[];

  @Prop({ default: false })
  verification: boolean;

  @Prop()
  verificationToken: string;

  @Prop({ default: "" })
  twoFactorAuthenticationSecret: string;
}

export const UserSchema = SchemaFactory.createForClass(User);