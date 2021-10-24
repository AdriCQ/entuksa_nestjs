import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'smtp.nauta.cu',
  port: process.env.MAIL_PORT || 465,
  user: process.env.MAIL_USER || 'acq95',
  password: process.env.MAIL_PASSWORD || 'KxH_621190719960',
  from: process.env.MAIL_FROM || 'noreply@nairda.net',
}));
