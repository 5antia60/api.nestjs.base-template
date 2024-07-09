import { registerAs } from '@nestjs/config';
import { TypeormEntities } from '../../core/typeorm/entities';
import { TypeormMigrations } from '../../core/typeorm/migrations';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: TypeormEntities,
  migrations: TypeormMigrations,
  migrationsTableName: 'migrations',
}))
