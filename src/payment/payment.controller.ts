import { 
    Controller,
    Post,
    Body,
    Req,
    Query
} from '@nestjs/common';
import { Request } from 'express';
import { CreatePaymentDto } from "./dto/create-payment.dto"
import { PaymentService } from './payment.service'

import { ApiHeader, ApiQuery } from '@nestjs/swagger';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @ApiHeader({ name: 'Authorization' })
    @ApiQuery({ name: 'userId' })
    @Post('create')
    create(@Req() request: Request, @Body() data: CreatePaymentDto){
        return this.paymentService.createOrder(request, data);
    }

    // @ApiQuery({ name: 'orderId' })
    // @Post('accept')
    // acceptOrder(@Query() args: { orderId: string }) {
    //     return this.acceptOrder(args.orderId)
    // }
}
