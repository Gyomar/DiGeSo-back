import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigType<typeof config>) => ({
        transport: {
          host: 'mail.digesolutions.com',
          secure: true,
          port: 465,
          auth: {
            user: configService.sendEmailUSer,
            pass: configService.sendEmailPass,
          },
        },
      }),
      inject: [config.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
