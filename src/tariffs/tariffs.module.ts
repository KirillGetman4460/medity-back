import { Module } from '@nestjs/common';
import { TariffsController } from './tariffs.controller';
import { TariffsService } from './tariffs.service';

import {TariffSchema,Tariff} from './schemas/tariff.schema'
import {UserSchema,User} from '../auth/schemas/users.schema'

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Tariff.name, schema:TariffSchema}]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [TariffsController],
  providers: [TariffsService]
})
export class TariffsModule {}
