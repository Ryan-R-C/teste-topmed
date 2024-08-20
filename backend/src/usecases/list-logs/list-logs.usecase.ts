import { Log } from "../../domain/user/entity/logs";
import { LogGateway } from "../../domain/user/gateway/logs.gateway";
import { Usecase } from "../usecase";

export type ListLogInputDto = {
    userId: string;
    isValid: boolean;
};

export type ListLogOutputDto = {
    logs: {
        id: string;
        userId: string;
        isValid: boolean;
        createdAt: Date;
    }[];
};

export class ListLogUsecase
    implements Usecase<ListLogInputDto, ListLogOutputDto>
{
    private constructor(private readonly userGateway: LogGateway) {}

    public static create(userGateway: LogGateway) {
        return new ListLogUsecase(userGateway);
    }

    public async execute({
        userId,
        isValid
    }: ListLogInputDto): Promise<ListLogOutputDto> {
        const twentyMinutesAgo = new Date();
        twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20);

        const aUsers = await this.userGateway.list(userId, isValid, twentyMinutesAgo);

        const output = this.presentOutput(aUsers);

        return output;
    }

    private presentOutput(logs: Log[]): ListLogOutputDto {
        return {
            logs: logs.map((p) => {
                return {
                    id: p.id,
                    userId: p.userId,
                    isValid: p.isValid,
                    createdAt: p.createdAt,
                };
            }),
        };
    }
}
