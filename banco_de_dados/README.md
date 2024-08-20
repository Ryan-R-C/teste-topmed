# Desenvolvimento banco de dados

## Desenvolver script para criação de tabela para gravar o cadastro de usuários;

```sql
-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Desenvolver script para cadastrar um novo usuário; na tabela criada anteriormente;
```sql
INSERT INTO `users` (`id`, `name`, `email`, `password`) 
VALUES ('unique-user-id', 'Nome do Usuário', 'email@teste.com', '');
```

## Desenvolver script para criação de tabela destinada a registrar o momento da tentativa de login, registrando o sucesso ou recusa no login;

```sql
-- CreateTable
CREATE TABLE `log` (
    `id` VARCHAR(191) NOT NULL,
    `isValid` BOOLEAN NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
```

## Criar consulta para apresentar usuários que acessaram o sistema nas últimas 2 horas;
```sql
SELECT 
    users.id AS user_id, 
    users.name AS user_name, 
    users.email AS user_email, 
    log.createdAt AS log_created_at
FROM `users`
INNER JOIN `log` 
ON users.id = log.userId
WHERE log.createdAt >= NOW() - INTERVAL 2 HOUR
ORDER BY log.createdAt DESC;
```
