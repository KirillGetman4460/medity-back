import { PartialType } from '@nestjs/swagger';
import { CreateForgotDto } from './create-forgot.dto';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateForgotDto {
    @ApiProperty({ required: true })
    newEmail:string
}