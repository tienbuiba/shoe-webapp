import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(user, otp: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './forgot-password',
      context: {
        name: user.name,
        otp,
      },
    });
  }
}
