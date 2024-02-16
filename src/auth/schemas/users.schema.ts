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

    @Prop({ default: false })
    verification:boolean

    @Prop()
    verificationToken:string

    @Prop({default:""})
    twoFactorAuthenticationSecret:string
}

export const UserSchema = SchemaFactory.createForClass(User)