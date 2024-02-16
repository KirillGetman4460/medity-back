import { ApiProperty } from '@nestjs/swagger';

export class UpdateForgoPasswordtDto {
    @ApiProperty({ required: true })
    newPassword:string
}