import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'app',
  host: process.env.APP_HOST || 'localhost',
  key: process.env.APP_KEY || 'appSecretsKey',
  env: process.env.APP_ENV || 'DEV',
}));
