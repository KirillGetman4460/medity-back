import { Module } from '@nestjs/common';
import {UserSchema,User} from '../auth/schemas/users.schema'

import { MongooseModule } from '@nestjs/mongoose';
import { GoogleAuthenticatorService } from './google-authenticator.service';

@Module({
  imports:[ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [ 
    GoogleAuthenticatorService],
})
export class GoogleAuthenticatorModule {}

