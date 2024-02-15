import { Schema,Prop,SchemaFactory } from "@nestjs/mongoose";

@Schema()

export class User{
    @Prop({ required: true })
    userId: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password:string

    @Prop()
    verification:boolean

    @Prop()
    verificationToken:string
}

export const UserSchema = SchemaFactory.createForClass(User)