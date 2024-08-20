import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Bcrypt } from "../../utils/bcrypt";
import { Usecase } from "../usecase";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string;
};

export type CreateUserOutputDto = {
    id: string;
};

export class CreateUserUsecase
    implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new CreateUserUsecase(userGateway);
    }

    public async execute({
        name,
        email,
        password,
    }: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const hashedPassword = await Bcrypt.hash(password)

        const aUser = User.create(name, email, hashedPassword);

        await this.userGateway.save(aUser);

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(user: User): CreateUserOutputDto {
        const output: CreateUserOutputDto = {
            id: user.id
        }

        return output;
    }
}
