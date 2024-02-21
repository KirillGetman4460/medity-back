import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './schemas/users.schema'
import {Tariff} from '../tariffs/schemas/tariff.schema'
import {CreateAuthDto} from './dto/create-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

import { MailService } from '../mail/mail.service';

import { Request } from 'express';

import generateRandomId from '../methods/generateRandomId'
import getBearerToken from '../methods/getBearerToken'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModule:Model<User>,
      @InjectModel(Tariff.name)  private tariffsModel: Model<Tariff>,
      private mailService: MailService  
    ){}

    async sendConfirmationEmail(user: any) {
      const url = `http://localhost:3000/confirm?token=${user.verificationToken}`;

      await this.mailService.sendEmail(
        user.email,
        'Подтвердите свой аккаунт',
        `Добро пожаловать, ${user.name}! Пожалуйста, подтвердите свой аккаунт, перейдя по следующей ссылке: ${url}`
      );
    }

    async create(data:CreateAuthDto){
        if (!data.email || !data.name || !data.password) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }
        try {
            
            const checkUser = await this.userModule.findOne({
                where: { email: data.email },
            });
            if(checkUser){
                return{
                    code:409,
                    message: 'This user already exists',
                }
            }

            const token = crypto.randomBytes(16).toString('hex');
            const generateId = generateRandomId();
            const tariffRandomId = generateRandomId();

            const result = await this.userModule.create({
                userId:generateId,
                name: data.name,
                email: data.email,
                password: bcrypt.hashSync(data.password),
                verificationToken:token
              })
            ;

            const tariffs = [
              {
                userId: generateId, // Используйте ID нового пользователя
                tariffId: tariffRandomId, // Используйте вашу функцию для генерации ID тарифа
                name: "Test",
                interestRate: 0, 
                term: 0,
                minAmount: 300, 
                maxAmount: 500, 
                description: "",
                active:false        
              },
              {
                userId: generateId, // Используйте ID нового пользователя
                tariffId: tariffRandomId, // Используйте вашу функцию для генерации ID тарифа
                name: "Standard",
                interestRate: 0, 
                term: 0,
                minAmount: 1000, 
                maxAmount: 5000, 
                description: "",   
                active:false     
              },
              {
                userId: generateId, // Используйте ID нового пользователя
                tariffId: tariffRandomId, // Используйте вашу функцию для генерации ID тарифа
                name: "Pro",
                interestRate: 0, 
                term: 0,
                minAmount: 5500, 
                maxAmount: 10000, 
                description: "",    
                active:false    
              }
            ];
            
            await this.tariffsModel.create({
              userId: generateId,
              tariffs: tariffs
            });
            // await this.sendConfirmationEmail(result)

            return {
                code: 201,
                message: "user create",
            };
        } catch (err) {
          console.log(err)
            return{
                code:500,
                message: 'Internal server error',
            }
        }
    }
    async login(data:LoginAuthDto){
        
        if (!data.email || !data.password) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }
        
        try {
            const checkUser = await this.userModule.findOne(
                { email: data.email }
            );
            
            if(!checkUser){
                return {
                    code: 404,
                    message: 'Not Found',
                };
            }            
            
            if (bcrypt.compareSync(data.password, checkUser.password)) {
                return {
                  code: 200,
                  token: jwt.sign(
                    { id: checkUser.userId },
                    "gfgd@43435sdfggppgdsf",
                  ),
                };
              } else {
                return {
                  code: 400,
                  message: 'Password is not correct',
                };
              }
        } catch (error) {
            return{
                code:500,
                message: 'Internal server error',
            }
        }
    }

    async verify(req: Request){
        const token = getBearerToken(req);
        
        try {
            if (!token) {
                return {
                  code: 400,
                  message: 'Not all arguments',
                };
              }
              const login = jwt.verify(token, "gfgd@43435sdfggppgdsf");
              
              
              const checkUser = await this.userModule.findOne(
                { userId: login.id }
                );    

              if (checkUser) {
                return {
                  code: 200,
                  data: checkUser,
                };
              }
        
              return {
                code: 404,
                message: 'Not Found',
              };
        } catch (err) {
            return {
                code: 500,
                message: err,
              };
        }
    }
}
