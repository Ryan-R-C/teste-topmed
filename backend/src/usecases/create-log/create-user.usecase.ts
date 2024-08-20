import { Log } from "../../domain/user/entity/logs";
import { LogGateway } from "../../domain/user/gateway/logs.gateway";
import { Usecase } from "../usecase";

export type CreateLogInputDto = {
    userId: string;
    isValid: boolean;
};

export type CreateLogOutputDto = {
    id: string;
};

export class CreateLogUsecase
    implements Usecase<CreateLogInputDto, CreateLogOutputDto>
{
    private constructor(private readonly logGateway: LogGateway) {}

    public static create(logGateway: LogGateway) {
        return new CreateLogUsecase(logGateway);
    }

    public async execute({
        userId,
        isValid,
    }: CreateLogInputDto): Promise<CreateLogOutputDto> {
        const aLog = Log.create(userId, isValid);

        await this.logGateway.save(aLog);

        const output = this.presentOutput(aLog);

        return output;
    }

    private presentOutput(log: Log): CreateLogOutputDto {
        const output: CreateLogOutputDto = {
            id: log.id
        }

        return output;
    }
}
