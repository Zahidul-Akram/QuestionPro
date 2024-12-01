import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should fetch hierarchy for valid ID', async () => {
    const result = await service.getAllEmployees(1);
    expect(result).toBeDefined();
    expect(result.child).toHaveLength(2);
});
});
