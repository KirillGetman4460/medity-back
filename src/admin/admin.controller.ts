import { 
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
 } from '@nestjs/common';

import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {

    // constructor(private readonly adminService: AdminService) {}

    // @Post('users')
    // register(@Body() userId:string) {
    //     return this.adminService.getAllUsers(userId);
    // }
}
