import { Module } from '@nestjs/common';
import {UserSchema,User} from '../auth/schemas/users.schema'
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {PaymentSchema,Payment} from '../payment/schemas/payment.schema'

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    { name: Payment.name, schema: PaymentSchema}
  ])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
