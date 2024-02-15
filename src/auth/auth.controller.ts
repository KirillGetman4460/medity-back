
import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
 } from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto'
import {LoginAuthDto} from './dto/login-auth.dto'
import {AuthService} from './auth.service'

import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() data: CreateAuthDto) {
        return this.authService.create(data);
    }

    @Post('login')
    loginClient(@Body() data: LoginAuthDto) {
        return this.authService.login(data);
    }

    @Post('verify')
    verifyClient(@Req() request: Request) {
      return this.authService.verify(request);
    }
}
