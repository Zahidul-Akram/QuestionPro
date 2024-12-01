import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',               
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    password: 'postgres', 
    database: 'db', 
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: false,
    logging: true, 
    migrations: [
        __dirname + '/../src/migrations/*{.ts,.js}',
    ],
    migrationsTableName: 'migration',
};
