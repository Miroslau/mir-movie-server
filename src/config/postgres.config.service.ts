import * as process from 'process';
import { config } from 'dotenv';

config();

export const Connection = {
  type: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  host: process.env.TYPEORM_HOST,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
};
