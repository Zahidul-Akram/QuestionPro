import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',               
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    password: '123', 
    database: 'db', 
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    logging: true, 
    migrations: [ 
        __dirname + '/../migrations/*.ts',
    ],
    migrationsTableName: 'migration',
};
