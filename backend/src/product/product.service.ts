import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';

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

  async createProduct(
    data: CreateProductDto,
  ): Promise<Prisma.ProductGetPayload<{ include: { categories: true } }>> {
    const product = await this.dbService.product.create({
      data: {
        ...data,
        categories: {
          connect: data.categories.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return product;
  }
}
