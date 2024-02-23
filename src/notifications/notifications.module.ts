import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import { User,UserSchema } from 'src/auth/schemas/users.schema';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Notification.name, schema: NotificationSchema },
    { name: User.name, schema: UserSchema },
  ])],
  providers: [NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}

