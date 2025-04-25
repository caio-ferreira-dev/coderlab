import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUrl,
  ArrayNotEmpty,
  ArrayUnique,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Relógio',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Quantidade em estoque (deve ser um número inteiro ≥ 0)',
    example: 2,
  })
  @IsNumber()
  @Min(0)
  qty: number;

  @ApiProperty({
    description: 'Preço do produto (número decimal ≥ 0)',
    example: 59.99,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example:
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  })
  @IsString()
  @IsUrl()
  photo: string;

  @ApiProperty({
    description: 'IDs das categorias às quais o produto pertence',
    example: ['cat4'],
    type: [String],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  categories: string[];
}
