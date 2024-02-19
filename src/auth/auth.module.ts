import { Module } from '@nestjs/common';
import { TariffsModule } from 'src/tariffs/tariffs.module'
import {UserSchema,User} from './schemas/users.schema'

import {TariffSchema,Tariff} from '../tariffs/schemas/tariff.schema'
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from '../mail/mail.module'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name:Tariff.name, schema:TariffSchema}
    ]),
    MailModule,
    TariffsModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
