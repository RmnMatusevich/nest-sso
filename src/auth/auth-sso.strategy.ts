import { Injectable, Inject } from '@nestjs/common';
import { Client, Strategy } from 'openid-client';
import * as passport from 'passport';

import { CLIENT } from './auth.constants';

@Injectable()
export class AuthSSOStrategy {
  constructor(@Inject(CLIENT) private readonly client: Client) {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    passport.use(
      'sso',
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, userinfo);
      }),
    );
  }
}
