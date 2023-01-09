import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SendMailService } from 'src/send-mail/send-mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private mailService: SendMailService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(
      password,
      parseInt(this.configService.get('AUTH_SALT_ROUND')),
    );
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
  async sendForgotPasswordLink(name: string, email: string, otpToken: string) {
    await this.mailService.sendForgotPassword(
      {
        name: name,
        email: email,
      },
      this.configService.get('FORGOT_PASSWORD_BASE_URL') + otpToken,
    );
  }
}
