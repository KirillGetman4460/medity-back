import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { Payment,PaymentSchema } from 'src/payment/schemas/payment.schema';
import { Tariff,TariffSchema } from 'src/tariffs/schemas/tariff.schema';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Payment.name, schema: PaymentSchema},
    { name: Tariff.name, schema: TariffSchema},
  ])
],
  providers: [SchedulerService],
  controllers: [SchedulerController]
})
export class SchedulerModule {}
