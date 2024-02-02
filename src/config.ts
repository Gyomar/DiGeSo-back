import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs('config', () => {
  return {
    sendEmailUSer: process.env.SEND_EMAIL_USER,
    sendEmailPass: process.env.SEND_EMAIL_PASS,
  };
});
