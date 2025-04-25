import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Buscar um produto pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do produto a ser buscado',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um produto' })
  @ApiParam({
    name: 'id',
    description: 'ID do produto a ser atualizado',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Prisma.ProductGetPayload<{ include: { categories: true } }>> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um produto pelo ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID do produto' })
  async deleteById(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
