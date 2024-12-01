import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async getAllEmployees(id: number): Promise<any> {
    const parentEmployees = await this.employeeRepository.findOne({ where: { id } });
    if (!parentEmployees) return null;

    const getChildrens = async (parentId: number) => {
      const children = await this.employeeRepository.find({ where: { id: parentId } });
      return Promise.all(
        children.map(async (child) => ({
          id: child.id,
          name: child.name,
          positionId: child.positionId,
          positionName: child.positionName,
          child: await getChildrens(child.id),
        })),
      );
    };

    return {
      id: parentEmployees.id,
      name: parentEmployees.name,
      positionId: parentEmployees.positionId,
      positionName: parentEmployees.positionName,
      child: await getChildrens(parentEmployees.id),
    };
  }
}
