// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as cron from 'node-cron';
import isDatePassed from 'src/methods/isDatePassed';

import { Payment } from 'src/payment/schemas/payment.schema';
import { Tariff } from 'src/tariffs/schemas/tariff.schema';
@Injectable()
export class SchedulerService {
    constructor(
        @InjectModel(Payment.name)
        private paymentModel: mongoose.Model<Payment>,

        @InjectModel(Tariff.name) private tariffModel: mongoose.Model<Tariff>
      ) {
        this.scheduleDailyTask();
      }
    
      private scheduleDailyTask() {
        cron.schedule('0 0 * * *', () => {
          this.dailyTask();
          this.accrueInterest();
        });
      }
      
      private async dailyTask(){
        try {
            const allPayments = await this.paymentModel.find({
                statusPayment:'accept'
            })

            await Promise.all(
              allPayments.map(async (item) => {
                const checkDate = !isDatePassed(item.date.endDate);
                const userTariff = await this.tariffModel.findOne({ userId: item.userId });
            
                if (checkDate && userTariff.tariffs.some(tariff => tariff.name === 'Test')) {
                  userTariff.tariffs = userTariff.tariffs.filter(tariff => tariff.name !== 'Test');
                } else {
                  userTariff.tariffs = userTariff.tariffs.map(tariff => tariff.name === 'Test' ? { ...tariff, active: checkDate } : tariff);
                }
            
                await userTariff.save();
              })
            );

        } catch (error) {
            console.log(error);
            
        }
        console.log('Выполняется каждый день в 00:00');
      }
      private async accrueInterest() {
        try {
          const allTariffs = await this.tariffModel.find({ 'tariffs.active': true });
      
          await Promise.all(
            allTariffs.map(async (userTariff) => {

              userTariff.tariffs = userTariff.tariffs.map(tariff => {
                if (tariff.active) {
                
                  const interest = tariff.amount * tariff.interestRate / 100;
                  tariff.amount += interest;
      
                }
                return tariff;
              });
      
              await userTariff.save();
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
      
}
