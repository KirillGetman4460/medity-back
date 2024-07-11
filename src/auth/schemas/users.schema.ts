import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({default: ''})
  firstName: string

  @Prop({default: ''})
  lastName: string

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({default: ''})
  dateBirthday: string
}

export const UserSchema = SchemaFactory.createForClass(User);