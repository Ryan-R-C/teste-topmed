import { PrismaClient } from "@prisma/client";
import { Log } from "../../../domain/user/entity/logs";
import { LogGateway } from "../../../domain/user/gateway/logs.gateway";

export class LogRepositoryPrisma implements LogGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new LogRepositoryPrisma(prismaClient);
    }

    public async save(log: Log): Promise<void> {
        const data = {
            id: log.id,
            userId: log.userId,
            isValid: log.isValid,
            createdAt: log.createdAt,
        };

        await this.prismaClient.logs.create({
            data,
        });
    }

    public async list(userId: string, isValid: boolean, dateGte: Date): Promise<Log[]> {
        const logs = await this.prismaClient.logs.findMany({
            where: {
                AND: [
                    { userId },
                    { isValid },
                    { createdAt: {
                        gte: dateGte
                    }}
                ]
            }
        });

        const logList = logs.map((p) => {
            const log = Log.with({
                id: p.id,
                userId: p.userId,
                isValid: p.isValid,
                createdAt: p.createdAt,
            });

            return log;
        });

        return logList;
    }
}
