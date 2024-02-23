import { 
    Controller,
    Post,
    Body,
    Req,
    Param,
    Get,
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

    @ApiQuery({ name: 'orderId' })
    @Post('accept')
    acceptOrder(@Query() args: { orderId: string }) {
        return this.paymentService.acceptOrder(args.orderId)
    }

    @ApiQuery({ name: 'orderId' })
  @Get('cancel')
  cancelOrder(@Query() args: { orderId: string }) {
    return this.paymentService.cancelOrder(args.orderId);
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiQuery({ name: 'userId' })
  @Get('history')
  historyOrder(@Query() args: { userId: string }, @Req() req: Request) {
    return this.paymentService.historyOrder(args.userId, req);
  }
}
