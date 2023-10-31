import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token) {
    try {
      return await auth().verifyIdToken(token, true);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
