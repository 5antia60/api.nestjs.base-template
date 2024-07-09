import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.DB_PORT || '5432', 10),
  nodenv: process.env.NODE_ENV,
}));
