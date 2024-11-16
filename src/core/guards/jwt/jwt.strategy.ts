import { ConfigService } from '@/configs';
import { RequestUser } from '@/core';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(JwtStrategy) {
  constructor(readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['HS256'],
      secretOrKey: config.jwtSecret,
    });
  }

  public async validate(...args: any[]) {
    const decodedJwt = args[0] as RequestUser;
    // const user = await this.db.user.findFirst({
    //   where: {
    //     email: decodedJwt.email,
    //   },
    // });

    return { ...decodedJwt, id: decodedJwt.uid };
  }
}
