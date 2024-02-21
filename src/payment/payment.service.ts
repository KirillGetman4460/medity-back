import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/users.schema';
import {Payment} from './schemas/payment.schema'
import { Request } from 'express';
import getBearerToken from '../methods/getBearerToken'
import getJwt from '../methods/getJwt'
import generateId from '../methods/generateRandomId'
import getCurrentDate from '../methods/getCurrentDate'
import { CreatePaymentDto } from "./dto/create-payment.dto"
import { TariffsService } from 'src/tariffs/tariffs.service';

const moment = require('moment');
@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name)
        private paymentModel: Model<Payment>,
        @InjectModel(User.name) 
        private userModel:Model<User>,
        private tariffsService:TariffsService
    ){}

    async createOrder(req: Request,data: CreatePaymentDto){
        const token = getBearerToken(req);

        if(!token){
            return {
                code: 400,
                message: 'Not all arguments',
            };
        }

        try {
            const login = getJwt(token);
            
            if(!login){
                return {
                    code: 404,
                    message: 'user not found',
                };
            }

            const currentUser = await this.userModel.findOne({userId: login.id})

            if (currentUser.userId !== login.id) {
                return {
                  code: 403,
                  message: 'You do not have permission',
                };
            }

            const createId = generateId();

            const currentDate = getCurrentDate()

            const currentTariff = data.tariff

            const currentTerm = currentTariff === "Test" ? 15 : currentTariff === "Standart" ? 30 : currentTariff === "Pro" ? 90 : null

            const result  = await this.paymentModel.create({
                orderId:createId,
                userId:login.id,
                interestRate:data.interestRate,
                currentDate:currentDate,
                tariff:currentTariff,
                date:{
                    startDate: currentDate,
                    endDate: moment(currentDate, "DD.MM.YYYY").add(currentTerm, 'days').format('DD.MM.YYYY')
                },                         
                price:data.price,
            })

            await this.tariffsService.updateTariffs(login.id,currentTariff)
            
            return{
                code:201,
                data:result 
            }

        } catch (err) {
            console.log(err);
            
            return{
                code:500,
                err
            }
        }
    }
    async acceptOrder(orderId:string){
        
        if(!orderId){
            return {
                code: 400,
                message: 'Not all arguments',
            };
        }
        try {
            const checkOrder = await this.paymentModel.findOne({
                orderId:orderId,
                statusPayment: 'wait',
            })

            if (!checkOrder) {
                return {
                  code: 404,
                  message: 'order not found',
                };
            }            

            await this.paymentModel.findOneAndUpdate(
                {orderId:orderId},
                {statusPayment:'accept'}
            )

            await this.tariffsService.deleteTestTariff(checkOrder.userId)



            return{
                code:200,
                message:"Order accept"
            }
        } catch (err) {
            return{
                code:500,
                message: err,
            }
        }
    }
    async cancelOrder(orderId:string){
        if (!orderId) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }

        try {
            const checkOrder = await this.paymentModel.findOne({
                orderId: orderId,
                statusPayment: 'wait',
              });
              if (!checkOrder) {
                return {
                  code: 404,
                  message: 'order not found',
                };
              }
        
              await this.paymentModel.findOneAndUpdate(
                { orderId: orderId },
                { statusPayment: 'cancel' },
              );
        
              return {
                code: 200,
                message: 'ok',
              };
        } catch (err) {
            return{
                code:500,
                message: err,
            }
        }

    }
    async historyOrder(userId: string, req: Request) {
        const token = getBearerToken(req);
    
        if (!userId || !token) {
          return {
            code: 400,
            message: 'Not all arguments',
          };
        }
    
        try {
          const login = getJwt(token);
    
          if (!login) {
            return {
              code: 404,
              message: 'user not found',
            };
          }
    
          const currentUser = await this.userModel.findOne({
            userId: login.id,
          });
    
          if (!currentUser) {
            return {
              code: 404,
              message: 'user not found',
            };
          }
    
          if (currentUser.userId !== userId) {
            return {
              code: 403,
              message: 'You do not have permission',
            };
          }
    
          const result = await this.paymentModel.find({
            userId: userId,
            statusPayment: 'accept',
          });
    
          return {
            code: 200,
            data: result,
          };
        } catch (err) {
          console.log(err);
          return {
            code: 500,
            message: err,
          };
        }
    }
}

