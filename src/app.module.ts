import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ForgotModule } from './forgot/forgot.module';
import { GoogleAuthenticatorModule } from './google-authenticator/google-authenticator.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kirilldemchenko69:cohBSEyvCzbxmFKY@cluster0.szobgqx.mongodb.net/'
    ), 
    AuthModule, 
    ForgotModule, 
    GoogleAuthenticatorModule, 
    AdminModule, 
    ProfileModule,
    NotificationsModule,
    SchedulerModule
  ],
  controllers: [AppController],
  providers: [AppService, AdminService],
})
export class AppModule {}
