import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmployeeHierarchy', () => {
    it('should return employee hierarchy for a given employee id', async () => {
      const mockEmployeeData = [
        {
          id: 2,
          name: 'Name 2',
          positionId: 2,
          positionName: 'Senior software eng',
          child: [
            {
              id: 3,
              name: 'Name 3',
              positionId: 3,
              positionName: 'Software eng',
              child: [
                {
                  id: 4,
                  name: 'Name 4',
                  positionId: 4,
                  positionName: 'Junior software eng',
                  child: null,
                },
              ],
            },
          ],
        },
      ];

      jest.spyOn(service, 'getAllEmployees').mockResolvedValue(mockEmployeeData);

      const result = await controller.getAllEmployees(1);
      expect(result).toEqual(mockEmployeeData);
      expect(service.getAllEmployees).toHaveBeenCalledWith(1);
    });

    it('should throw an error if employee not found', async () => {
      jest.spyOn(service, 'getAllEmployees').mockRejectedValue(new Error('Employee not found'));

      try {
        await controller.getAllEmployees(999);
      } catch (e) {
        expect(e.message).toBe('Employee not found');
      }
    });
  });
});
