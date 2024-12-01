import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { typeOrmConfig } from './db/config/typeorm.config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: 'postgres',
    //     database: 'test',
    //     entities: [Employee],
    //     synchronize: true,
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    EmployeesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
