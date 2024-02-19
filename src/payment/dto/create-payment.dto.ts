import { ApiProperty } from '@nestjs/swagger';

interface DateTypes {
  startDate: string;
  endDate: string;
}

export class CreatePaymentDto {

  @ApiProperty({ required: true })
  currentDate:string

  @ApiProperty({ required: true })
  orderId: string;

  @ApiProperty({ required: true })
  statusPayment: string;

  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  interestRate:string

  @ApiProperty({ required: true })
  date: DateTypes;

  @ApiProperty({ required: true })
  tariff:string

  @ApiProperty({ required: true })
  price: string;
}