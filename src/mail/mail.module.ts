import { MailerModule } from '@nestjs-modules/mailer';
import {UserSchema,User} from '../auth/schemas/users.schema'
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-mail.outlook.com',
        port:587,
        secure: false,
        auth: {
          user: 'kutuzovmaksim14@gmail.com',
          pass: 'D,HGexS9/vLb79^',
        },
      },
      defaults: {
        from: '\"No Reply\" <kutuzovmaksim14@gmail.com>',
      },
    }),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema}
    ])
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}