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

 
import { ApiBearerAuth, ApiHeader, ApiHeaders } from '@nestjs/swagger';

@Controller('google-authenticator')
export class GoogleAuthenticatorController {

    // @ApiHeaders([{ name: 'GoogleAuthenticator' }])
    // @Post('code')
    // googleAuthenticator(userId:string){
    
    // }
}
