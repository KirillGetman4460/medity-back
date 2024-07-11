import { Module } from '@nestjs/common';
import {UserSchema,User} from './auth/schemas/users.schema'
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ForgotModule } from './forgot/forgot.module';
import { GoogleAuthenticatorModule } from './google-authenticator/google-authenticator.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { PaymentModule } from './payment/payment.module';
import { TariffsModule } from './tariffs/tariffs.module';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MeditationService } from './meditation/meditation.service';
import { MeditationController } from './meditation/meditation.controller';
import { MeditationModule } from './meditation/meditation.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kirilldemchenko69:cohBSEyvCzbxmFKY@cluster0.szobgqx.mongodb.net/'), 
    AuthModule, 
    MailModule, 
    ForgotModule, 
    GoogleAuthenticatorModule, 
    AdminModule, 
    PaymentModule, 
    TariffsModule, FileModule, ProfileModule, SchedulerModule, NotificationsModule, MeditationModule, CategoriesModule
  ],
  controllers: [AppController, MeditationController],
  providers: [AppService, AdminService, MeditationService],
})
export class AppModule {}
