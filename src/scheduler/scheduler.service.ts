// @ts-nocheck
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as cron from 'node-cron';
import isDatePassed from 'src/methods/isDatePassed';

@Injectable()
export class SchedulerService {
    constructor(
        @InjectModel(Payment.name)
        private paymentModel: mongoose.Model<Payment>,
      ) {
        // this.scheduleDailyTask();
      }
    
      private scheduleDailyTask() {
        cron.schedule('0 0 * * *', () => {
          this.dailyTask();
          this.accrueInterest();
        });
      }
      
      private async dailyTask(){
        try {

        } catch (error) {
            console.log(error);
            
        }
        console.log('Выполняется каждый день в 00:00');
      }
      private async accrueInterest() {
        try {
        } catch (error) {
          console.log(error);
        }
      }
      
}
