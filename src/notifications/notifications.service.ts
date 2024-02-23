import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/users.schema';
import * as Pusher from 'pusher';

import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  private pusher: Pusher;

  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) private userModule:Model<User>,
  ) {
    this.pusher = new Pusher({
        appId: "316c8ac0-c4b4-4b4f-8f30-e5abc134d210",
        key: "2800E42B6502A5FA82E0DF4ACC209A13CFF6271772CE32FC2EF10F9722D0460D",
        secret: "SECRET_KEY",
        useTLS: false,
        cluster: "CLUSTER",
        host: "HOST",
    });
  }

  async trigger(channel: string, event: string, message: any) {
    this.pusher.trigger(channel, event, message);
  }

  async create(createNotificationDto: any) {
    if(!createNotificationDto){
      return {
        code: 400,
        message: 'Not all arguments',
      };  
    }
  
    const checkUser = this.userModule.findOne({userId:createNotificationDto.userId})
  
    if(!checkUser){
      return {
        code: 404,
        message: 'Not found',
      };  
    }
  
    const createMessage = {
      userId:createNotificationDto.userId,
      message:createNotificationDto.message,     
    }
  
    const createdNotification = new this.notificationModel(createMessage);
    await this.trigger(`notifications-${createNotificationDto.userId}`, 'new-notification', createdNotification);
    return createdNotification.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }
}