import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CategoryService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAllCategories(): Promise<Category[]> {
    return this.dbService.category.findMany();
  }
}
