import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategories: Category[] = [
    { id: '1', name: 'Categoria 1', parentId: null },
    { id: '2', name: 'Categoria 2', parentId: '1' },
  ];

  const mockFindAllCategories = jest.fn().mockResolvedValue(mockCategories);

  const mockCategoryService = {
    findAllCategories: mockFindAllCategories,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories from the service', async () => {
    const result = await controller.getAll();
    expect(result).toEqual(mockCategories);
    expect(mockFindAllCategories).toHaveBeenCalled();
  });
});
