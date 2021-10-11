import { Client, Strategy } from 'openid-client';
import { Injectable, Inject } from '@nestjs/common';

import { CLIENT } from './auth.constants';
import * as passport from 'passport';

@Injectable()
export class AuthSSOStrategy {
  constructor(@Inject(CLIENT) private readonly client: Client) {
    passport.use(
      'sso',
      new Strategy({ client }, (tokenSet, userinfo, done) => {
        return done(null, userinfo);
      }),
    );
  }
}
