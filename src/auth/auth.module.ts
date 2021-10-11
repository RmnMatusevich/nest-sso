import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Issuer } from 'openid-client';

import { AuthSSOStrategy } from './auth-sso.strategy';
import { CLIENT } from './auth.constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule],
  providers: [
    AuthSSOStrategy,
    {
      provide: CLIENT,
      useFactory: async (configService: ConfigService) => {
        const oneLoginIssuer = await Issuer.discover(
          'https://rmnmatusevich.onelogin.com/oidc/2',
        );
        return new oneLoginIssuer.Client({
          client_id: configService.get<string>('CLIENT_ID'),
          client_secret: configService.get<string>('CLIENT_SECRET'),
          redirect_uris: ['http://localhost:3000/auth/callback'],
          response_types: ['code'],
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
