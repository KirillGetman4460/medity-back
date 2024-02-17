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

const moment = require('moment');
@Injectable()
export class PaymentService {
    constructor(
        @InjectModel(Payment.name)
        private paymentModel: Model<Payment>,
        @InjectModel(User.name) 
        private userModel:Model<User>,
    ){}

    async createOrder(req: Request,data: CreatePaymentDto){
        const token = getBearerToken(req);
        

        if(!data.userId || !token){
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

            if (currentUser.userId !== data.userId) {
                return {
                  code: 403,
                  message: 'You do not have permission',
                };
            }

            const createId = generateId();

            const currentDate = getCurrentDate()

            const currentTariff = data.tariff

            const result  = await this.paymentModel.create({
                orderId:createId,
                userId:login.id,
                interestRate:data.interestRate,
                currentDate:currentDate,
                tariff:currentTariff,
                date:[
                    currentTariff === "Test" ?  moment(currentDate).add(15, 'days').format('DD.MM.YYYY') : 
                    currentTariff === "Standart" ? moment(currentDate).add(30, 'days').format('DD.MM.YYYY') :
                    currentTariff === "Pro" ? moment(currentDate).add(90, 'days').format('DD.MM.YYYY') : null
                ],
                price:data.price,
            })
            
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

        } catch (error) {
            
        }
    }
}

