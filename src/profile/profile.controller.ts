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
import { ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {

    constructor(private readonly profileService: ProfileService) {}

    @ApiHeader({ name: 'Authorization' })
    @ApiQuery({ name: 'userId' })
    @Get('one')
    getDataProfile(@Query() args: { userId: string }, @Req() req: Request) {
        return this.profileService.getDataProfile(args.userId, req);
    }
}
