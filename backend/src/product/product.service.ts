import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DatabaseService) {}

  async findProductById(id: string): Promise<Product> {
    const product = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado.`);
    }

    return product;
  }
}
