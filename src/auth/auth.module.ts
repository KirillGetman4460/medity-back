import { Module } from '@nestjs/common';
import {UserSchema,User} from './schemas/users.schema'

import { MongooseModule } from '@nestjs/mongoose';


import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
