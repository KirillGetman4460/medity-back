import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'kutuzovmaksim14@gmail.com',
          pass: 'fuckyou228',
        },
      },
      defaults: {
        from: '\"No Reply\" <noreply@example.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // export for DI
})
export class MailModule {}