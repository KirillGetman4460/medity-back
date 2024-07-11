import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  password: string;
}