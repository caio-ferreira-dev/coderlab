import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly dbService: DatabaseService) {}

  async findAllProducts(name?: string): Promise<Product[]> {
    const isPostgres = process.env.DATABASE_URL?.includes('postgres');

    const whereClause: Prisma.ProductWhereInput = {
      name: {
        contains: name,
        ...(isPostgres && { mode: 'insensitive' }), // Aplica "mode: 'insensitive'" só para PostgreSQL
      },
    };

    return this.dbService.product.findMany({
      where: whereClause,
    });
  }

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

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<Prisma.ProductGetPayload<{ include: { categories: true } }>> {
    const existingProduct = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new NotFoundException('Produto não encontrado');
    }

    const updatedProduct = await this.dbService.product.update({
      where: { id },
      data: {
        ...data,
        categories: data.categories
          ? {
              set: data.categories.map((categoryId) => ({ id: categoryId })),
            }
          : undefined,
      },
      include: {
        categories: true,
      },
    });

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Product> {
    const existing = await this.dbService.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return this.dbService.product.delete({
      where: { id },
    });
  }
}
