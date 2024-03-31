import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeormEntities } from '../../core/typeorm/entities';
import { TypeormMigrations } from '../../core/typeorm/migrations';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: TypeormEntities,
  migrations: TypeormMigrations,
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
})
