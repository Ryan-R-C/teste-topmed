import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { LogGateway } from "../../domain/user/gateway/logs.gateway";
import { Bcrypt } from "../../utils/bcrypt";
import { Jsonwebtoken } from "../../utils/jsonwebtoken";
import { Usecase } from "../usecase";
import { CreateLogUsecase } from "../create-log/create-user.usecase";
import { ListLogUsecase } from "../list-logs/list-logs.usecase";

export type LoginInputDto = {
    email: string;
    password: string;
};

export type LoginOutputDto = {
    token: string;
} | null;

export class LoginUsecase
    implements Usecase<LoginInputDto, LoginOutputDto>
{
    private readonly listLogUsecase: ListLogUsecase;
    private readonly createLogUsecase: CreateLogUsecase;

    private constructor(private readonly userGateway: UserGateway, public readonly logGateway: LogGateway) {
        this.createLogUsecase = CreateLogUsecase.create(logGateway);
        this.listLogUsecase = ListLogUsecase.create(logGateway);
    }

    public static create(userGateway: UserGateway, logGateway: LogGateway) {
        return new LoginUsecase(userGateway, logGateway);
    }

    public async execute({
        email,
        password,
    }: LoginInputDto): Promise<LoginOutputDto> {
        const user = await this.userGateway.find({email})

        if(!user) return null

        const loginTries = await this.listLogUsecase.execute({userId: user.id, isValid: false})

        if(loginTries.logs.length > 3) return null

        const isMatchPassword = Bcrypt.compare(password, user.password)

        await this.createLogUsecase.execute({isValid: isMatchPassword, userId: user.id});

        if(!isMatchPassword) return null

        const token = Jsonwebtoken.generate(user.id)

        const output = this.presentOutput(token);

        return output;
    }

    private presentOutput(token: string): LoginOutputDto {
        const output: LoginOutputDto = {
            token
        }

        return output;
    }
}
