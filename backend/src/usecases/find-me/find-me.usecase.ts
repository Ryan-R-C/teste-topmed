import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Jsonwebtoken } from "../../utils/jsonwebtoken";
import { Usecase } from "../usecase";

export type FindMeInputDto = {
    token: string | undefined
};

export type FindMeOutputDto = {
    user: {
        id: string;
        name: string;
        email: string;
    }
} | null;

export class FindMeUsecase
    implements Usecase<FindMeInputDto, FindMeOutputDto>
{
    private constructor(private readonly userGateway: UserGateway) {}

    public static create(userGateway: UserGateway) {
        return new FindMeUsecase(userGateway);
    }

    public async execute({
        token,
    }: FindMeInputDto): Promise<FindMeOutputDto> {
        if(!token) return null
        
        const decode = Jsonwebtoken.validate(token)

        if(!decode || !decode?.id) return null

        const { id } = decode

        const aUser = await this.userGateway.find({id})

        if(!aUser) return null

        const output = this.presentOutput(aUser);

        return output;
    }

    private presentOutput(user: User): FindMeOutputDto {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        };
    }
}
