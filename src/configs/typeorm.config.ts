import { registerAs } from '@nestjs/config';

export default registerAs('typeorm', () => ({
  connection: process.env.TYPEORM_CONNECTION || 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || 'admin',
  password: process.env.TYPEORM_PASSWORD || 'admin',
  database: process.env.TYPEORM_DATABASE || 'db',
  sync: process.env.TYPEORM_SYNCHRONIZE || false,
}));
