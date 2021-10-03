import { registerAs } from '@nestjs/config';

export default registerAs('path', () => ({
  name: process.env.STORAGE_PATH || './storage',
}));
