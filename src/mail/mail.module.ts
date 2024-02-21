import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: '127.0.0.1',
        port: 1025,
        secure: false,
        auth: {
          user: 'adminbitrockinfluencers@protonmail.com',
          pass: 'UPy844VugztAwq2',
        },
      },
      defaults: {
        from: '\"No Reply\" <adminbitrockinfluencers@protonmail.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}