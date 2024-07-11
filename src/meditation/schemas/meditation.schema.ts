import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Meditation extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop()
  id:number

  @Prop()
  title: string

  @Prop()
  duration: string

  @Prop()
  description: string;

  @Prop()
  categoryId: number;

}

export const MeditationSchema = SchemaFactory.createForClass(Meditation);