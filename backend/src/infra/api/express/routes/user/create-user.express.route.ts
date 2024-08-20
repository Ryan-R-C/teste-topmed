import { Request, Response } from "express";
import {
    CreateUserInputDto,
    CreateUserUsecase,
} from "../../../../../usecases/create-user/create-user.usecase";
import { HttpMethod, Route } from "../route";

export type CreateUserResponseDto = {
    id: string;
};

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase
    ) {}

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            "/users",
            HttpMethod.POST,
            createUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, email, password } = request.body;
            
            if(!password || !email || !name) {
                response.status(500).json({message: 'Missing arguments'});
                return
            }


            const input: CreateUserInputDto = {
                name,
                email,
                password
            };

            const output: CreateUserResponseDto =
                await this.createUserService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateUserResponseDto): CreateUserResponseDto {
        const response = { id: input.id };
        return response;
    }
}
