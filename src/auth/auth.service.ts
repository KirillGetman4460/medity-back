import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './schemas/users.schema'
import {CreateAuthDto} from './dto/create-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

import { Request } from 'express';

import generateRandomId from '../methods/generateRandomId'
import getBearerToken from '../methods/getBearerToken'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


@Injectable()
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModule:Model<User>, 
    ){}

    async create(data:CreateAuthDto){
        if (!data.firstName || !data.lastName || !data.password) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }
        try {
            
            const checkUser = await this.userModule.findOne({
              firstName: data.firstName
            });
            
            if(checkUser){
                return{
                    code:409,
                    message: 'This user already exists',
                }
            }
            const generateId = generateRandomId();

            await this.userModule.create({
                userId:generateId,
                firstName: data.firstName,
                lastName: data.lastName,
                password: bcrypt.hashSync(data.password),
              })
            ;
            
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
        
        if (!data.firstName || !data.password) {
            return {
              code: 400,
              message: 'Not all arguments',
            };
        }
        
        
        try {
            const checkUser = await this.userModule.findOne(
                { firstName: data.firstName }
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
