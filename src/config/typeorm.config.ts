import { DataSource } from 'typeorm';
import { Connection } from './postgres.config.service';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AppDataSource = new DataSource({
  ...Connection,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
