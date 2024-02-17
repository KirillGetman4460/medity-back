import { Controller, Get, Post, Body } from '@nestjs/common';
import { TariffsService } from './tariffs.service';
import { Tariff } from './schemas/tariff.schema';

@Controller('tariffs')
export class TariffsController {
  constructor(private readonly tariffsService: TariffsService) {}

  @Get('all')
  async findAll(): Promise<Tariff[]> {
    return this.tariffsService.findAll();
  }

  @Post('create')
  async create(@Body() tariff: Tariff): Promise<Tariff> {
    return this.tariffsService.create(tariff);
  }
}
