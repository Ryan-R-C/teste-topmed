import { PrismaClient } from "@prisma/client";
import { User, UserProps } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";

export class UserRepositoryPrisma implements UserGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new UserRepositoryPrisma(prismaClient);
    }

    public async save(user: User): Promise<void> {
        const data = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        };

        await this.prismaClient.user.create({
            data,
        });
    }

    public async find(filter: Partial<UserProps>): Promise<User | null> {
        const userFound = await this.prismaClient.user.findFirst({
            where: filter
        });

        if(!userFound) return null

        const user = User.with({
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            password: userFound.password,
        });

        return user
    }

    public async list(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany();

        const userList = users.map((p) => {
            const user = User.with({
                id: p.id,
                name: p.name,
                email: p.email,
                password: p.password,
            });

            return user;
        });

        return userList;
    }
}
