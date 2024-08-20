# Como executar o projeto

## 1. Copie o arquivo .env de exemplo
```bash
cp .env.example .env
```

## 2. Configure as variáveis de ambiente no arquivo .env
```env
DATABASE_DATABASE = '...'
DATABASE_USERNAME = '...'
DATABASE_PASSWORD = '...'
DATABASE_HOST = '...'
DATABASE_PORT = '...'
``` 

## 3. Execute o docker compose para a criação do banco de dados
```bash
yarn dockerup
```

Caso o comando falhe, execute manualmente:
```bash
docker-compose --env-file .env up -d
```

## 4. Instale as dependências
```bash
yarn
```

## 5. Execute as migrações do banco de dados
```bash
yarn prisma migrate dev
```

## 6. Inicie o projeto
```bash
yarn dev
```