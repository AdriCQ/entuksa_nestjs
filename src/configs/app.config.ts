import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME || 'app',
  host: process.env.APP_HOST || 'http://localhost',
  port: process.env.APP_PORT || 3000,
  key: process.env.APP_KEY || 'appSecretsKey',
  env: process.env.APP_ENV || 'DEV',
}));
