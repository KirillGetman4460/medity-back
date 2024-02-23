import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  message: string;
}