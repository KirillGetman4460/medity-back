import { 
  Controller, 
  Get, 
  Post, 
  Body,
  Param,
  Req
} from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { Tariff } from './schemas/tariff.schema';

import { Request } from 'express';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @Get(':userId')
  async getAllTariffs(
    @Req() request: Request,
    @Param('userId') userId: string
  ){
    return this.tariffsService.getAllTariffs(request,userId)
  }

  // @Post('create')
  // async create(@Body() tariff: Tariff): Promise<Tariff> {
  //   return this.tariffsService.create(tariff);
  // }
}
