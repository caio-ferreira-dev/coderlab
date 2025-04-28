# Coder Lab - Teste Técnico

Este repositório contém um aplicativo construído com **NestJS** e **ViteJS + React** como parte de um teste técnico fornecido pela **Coder Lab**.

## Tecnologias Utilizadas

As seguintes tecnologias foram usadas para construir a aplicação:

### Conforme Requisitado foram utilizadas:

- **NodeJS**: ^20.17.0
- **NestJS**: 11.0.1
- **Prisma**: 6.6.0
- **Vite**: 6.3.1
- **ReactJS**: 19.0.0
- **MySQL**: 8.0

### Bibliotecas adicionais:

- **ShadcnUI** | Biblioteca de componentes de UI, escolhida pela simplicidade de uso e muito performática devido a como são importados os componentes.
- **framer-motion** | Biblioteca de animações css simplificadas, escolhida pela pouca complexidade e facilidade de aplicar animações clássicas de interfaces em qualquer elemento/componente.
- **Swagger** | Biblioteca de documentação de API, escolhida pela facilidade de gerar uma documentação semi-automática baseada em decorators e dtos de cada endpoint criado.
- **class-validator** | Biblioteca de validação de parâmetros/corpo de requisição, escolhida para simplificar a verificação/tipagem dos parâmetros e corpo das requisições feitas à cada endpoint.

## Configuração

_Esta aplicação utiliza MySQL como banco de dados, mas você pode modificar as configurações no arquivo `.env` caso deseje utilizar o Postgres._

### Rodando a Aplicação com Docker Compose

Para rodar tanto a aplicação quanto o banco de dados MySQL em containers Docker, siga os passos abaixo:

1. **Certifique-se de estar na pasta raiz do projeto, onde o arquivo `docker-compose.yml` está localizado**, que define os serviços da aplicação e do banco de dados MySQL.

2. **Execute o seguinte comando para construir e iniciar ambos os containers** (aplicação e banco de dados):

   ```bash
   docker-compose up --build -d
   ```

3. Isso irá iniciar os containers da aplicação e do MySQL no modo destacado (detached mode).

4. Os dados do banco de dados serão salvos em um volume Docker "mysql_data", que será gerenciado localmente pelo Docker.

5. **Acesse a [página inicial](http://localhost:4173) e também a [documentação da api](http://localhost:3000/docs), configurada com Docker.**

6. ***

### Parando e Removendo Containers Docker

Para parar e remover os containers Docker, siga os passos abaixo:

1. **Pare os containers em execução:**:

   ```bash
   docker-compose down
   ```

2. **Remova os containers parados e volumes** (opcional):
   ```bash
   docker-compose down --volumes
   ```

### Passos de Instalação Manual

1. **Clone ou faça um fork deste repositório** para sua máquina local.
2. **Abra seu terminal** e certifique-se de estar na raiz do projeto antes de executar os comandos abaixo.

3. **Navegue até a pasta "backend" e instale as dependências:**:

   ```bash
   cd ./backend && npm i
   ```

4. **Crie o arquivo `.env` e configure o prisma/banco de dados:**:

   - Renomeie o arquivo `.env.example` para `.env`.
   - Modifique a seguinte variável de acordo com sua configuração:

   ```env
   DATABASE_URL="db://dbuser:dbpassword@host:port/dbname"
   ```

5. **Gere o cliente do prisma e execute as migrações do banco de dados:**:

   ```bash
   npx prisma generate && npx prisma migrate deploy
   ```

   _Há um arquivo dentro de /prisma chamado seed.ts que contém alguns exemplos de categoria, sinta-se à vontade para modificar este arquivo e executar um `npx prisma db seed` caso você queira popular a tabela de Category do banco de dados_

6. **Construa e inicie a aplicação backend:**:

   ```bash
   npm run build && npm run start:prod
   ```

7. **Abra outro terminal na raiz do projeto, vá para a pasta do frontend e instale as dependências:**

   ```bash
   cd ./frontend && npm i
   ```

8. **Construa e inicie a aplicação frontend:**:

   Configuração para ambiente de produção:

   ```bash
   npm run build
   npm install -g serve
   serve -s dist -p 3001
   ```

9. **Acesse a [página inicial](http://localhost:3001) e também a [documentação da api](http://localhost:3000/docs), configurada manualmente.**

### Por último, todo feedback é bem vindo e muito importante! Caso possa, por favor entre em contato comigo.
