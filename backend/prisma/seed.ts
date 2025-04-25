/* eslint-disable @typescript-eslint/no-misused-promises */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Verifica se as categorias já existem
  const existingCategories = await prisma.category.findMany({
    where: {
      id: { in: ['cat1', 'cat2', 'cat3'] },
    },
  });

  const existingIds = existingCategories.map((cat) => cat.id);

  if (existingIds.length === 3) {
    console.log('Categorias já estão cadastradas no banco de dados.');
    return;
  }

  const eletronicos = await prisma.category.create({
    data: {
      id: 'cat1',
      name: 'Eletrônicos',
      parentId: null,
    },
  });

  const celulares = await prisma.category.create({
    data: {
      id: 'cat2',
      name: 'Celulares',
      parentId: eletronicos.id,
    },
  });

  const roupas = await prisma.category.create({
    data: {
      id: 'cat3',
      name: 'Roupas',
      parentId: null,
    },
  });

  console.log(
    `Categorias ${[eletronicos.name, celulares.name, roupas.name].join(', ')} populadas com sucesso`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
