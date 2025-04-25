import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

@ApiTags('Categoria')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return this.categoryService.findAllCategories();
  }
}
