import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let dbService: { category: { findMany: jest.Mock } };

  const mockCategories: Category[] = [
    { id: '1', name: 'Category 1', parentId: null },
    { id: '2', name: 'Category 2', parentId: '1' },
  ];

  beforeEach(async () => {
    dbService = {
      category: {
        findMany: jest.fn(() => Promise.resolve(mockCategories)),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: DatabaseService, useValue: dbService },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    const result = await service.findAllCategories();
    expect(result).toEqual(mockCategories);
    expect(dbService.category.findMany).toHaveBeenCalled();
  });
});
