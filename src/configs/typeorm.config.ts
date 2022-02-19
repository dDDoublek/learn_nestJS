import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hankyeolkang',
  password: 'Gksruf94@',
  database: 'NestJSBoardProject',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
