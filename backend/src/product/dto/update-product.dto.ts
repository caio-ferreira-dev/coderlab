import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Nome do produto', example: 'Relógio' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Quantidade em inteiros', example: 2 })
  @IsNumber()
  @IsOptional()
  qty?: number;

  @ApiPropertyOptional({ description: 'Preço do produto', example: 59.99 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'URL da foto do produto',
    example:
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  })
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiPropertyOptional({
    description: 'IDs das categorias associadas',
    example: ['clocks', 'accessories'],
  })
  @IsArray()
  @IsOptional()
  categories?: string[];
}
