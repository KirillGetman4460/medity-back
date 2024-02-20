import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port:587,
        secure: false,
        auth: {
          user: 'tt2222612@gmail.com',
          pass: 'testTesting64',
        },
      },
      defaults: {
        from: '\"No Reply\" <tt2222612@gmail.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // export for DI
})
export class MailModule {}