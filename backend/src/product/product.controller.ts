import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Prisma.ProductGetPayload<{ include: { categories: true } }>> {
    return this.productService.updateProduct(id, data);
  }
}
