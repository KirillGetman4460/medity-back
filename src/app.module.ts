import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ForgotModule } from './forgot/forgot.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kirilldemchenko69:cohBSEyvCzbxmFKY@cluster0.szobgqx.mongodb.net/'), AuthModule, MailModule, ForgotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
