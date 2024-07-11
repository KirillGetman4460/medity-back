import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/users.schema';
import * as speakeasy from 'speakeasy';

@Injectable()
export class GoogleAuthenticatorService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // async setTwoFactorAuthenticationSecret(secret: string, userId: string) {
  //   const user = await this.userModel.findOne({userId:userId});
  //   user.twoFactorAuthenticationSecret = secret;
  //   await user.save();
  // }

  async generateTwoFactorAuthenticationSecret(user) {
    const secret = speakeasy.generateSecret({
      name: `Your App (${user.email})`,
    });

    // await this.setTwoFactorAuthenticationSecret(secret.base32, user.id);

    return {
      otpauthUrl: secret.otpauth_url,
      base32: secret.base32,
    };
  }

  async validateTwoFactorAuthenticationCode(twoFactorAuthenticationCode, user) {
    return speakeasy.totp.verify({
      secret: user.twoFactorAuthenticationSecret,
      encoding: 'base32',
      token: twoFactorAuthenticationCode,
    });
  }
}