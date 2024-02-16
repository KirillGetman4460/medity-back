import { 
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Controller } from '@nestjs/common';

import { ForgotService } from './forgot.service';
import { CreateForgotDto } from './dto/create-forgot.dto';
import { UpdateForgotDto } from './dto/update-forgot.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('forgot')
export class ForgotController {
    constructor(private readonly forgotService: ForgotService) {}

    @ApiQuery({ name: 'email' })
    @Get('email')
    checkEmail(@Query() args: { email: string }) {
        return this.forgotService.checkEmail(args.email);
    }

    @ApiQuery({ name: 'userId' })
    @ApiQuery({ name: 'password' })
    @Get('password')
    resetPassword(@Query() args: { userId: string; password: string }) {
        return this.forgotService.resetPassword(args.userId, args.password);
    }
}
