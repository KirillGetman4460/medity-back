import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import {UserSchema,User} from '../auth/schemas/users.schema'
import {PaymentSchema,Payment} from './schemas/payment.schema'
import { TariffsModule } from 'src/tariffs/tariffs.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports:[ MongooseModule.forFeature([
    { name: User.name, schema: UserSchema},
    { name: Payment.name, schema: PaymentSchema},
  ]),
  TariffsModule
],
  providers: [PaymentService],
  controllers: [PaymentController]
})
export class PaymentModule {}
