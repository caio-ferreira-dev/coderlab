# Use imagem do Node 20
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do projeto
COPY . .

# Compile o projeto
RUN npm run build

# Instale o servidor http para servir os arquivos
RUN npm install -g serve

# Porta exposta (padrão do serve)
EXPOSE 4173

# Comando para rodar o app
CMD ["serve", "-s", "dist", "-l", "4173"]
