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
import {UpdateForgoPasswordtDto} from './dto/update-forgot-password'
import { ApiQuery } from '@nestjs/swagger';

@Controller('forgot')
export class ForgotController {
    constructor(private readonly forgotService: ForgotService) {}

    @ApiQuery({ name: 'name' })
    @Get('email')
    checkEmail(@Query() args: { name: string },@Body() data:UpdateForgotDto) {
        return this.forgotService.checkEmail(args.name,data);
    }

    @ApiQuery({ name: 'userId' })
    @ApiQuery({ name: 'newPassword' })
    @Get('password')
    resetPassword(@Query() args: { userId: string},@Body() data:UpdateForgoPasswordtDto) {
        return this.forgotService.resetPassword(args.userId, data.newPassword);
    }
}
