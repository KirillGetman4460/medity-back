import { Model } from 'mongoose';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Payment} from '../payment/schemas/payment.schema'
import {UserSchema,User} from '../auth/schemas/users.schema'
import getBearerToken from '../methods/getBearerToken'
import getJwt from '../methods/getJwt'
@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>,
        @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    ){}

    async getDataProfile(userId: string, req: Request){
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

            const userData = await this.userModel
                .findOne({ userId: userId })
                .select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
                .lean()
                .exec();

            // const paymentData = await this.paymentModel.find({ userId: userId });

            // console.log(paymentData);
            
            return {
                code: 200,
                profile: {
                  ...userData
                },
            };

        } catch (err) {
            return {
                code: 500,
                message: err,
            };
        }

    }
    async getAllUsers(userId: string, req: Request){
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

            const users = await this.userModel.find()

            return {
                code:200,
                users
            }

        } catch (err) {
            return{
                code:500,
                message:err
            }
        }
    }
}
