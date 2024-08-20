import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { FindMeUsecase } from "../../../../../usecases/find-me/find-me.usecase";


export type FindMeResponseDto = {
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export class FindMeRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findMeService: FindMeUsecase
    ) {}

    public static create(findMeService: FindMeUsecase) {
        return new FindMeRoute(
            "/me",
            HttpMethod.GET,
            findMeService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const token: string | undefined = request.headers['x-access-token'] as string

            const output = await this.findMeService.execute({ token });

            if(!output){
                response.status(401).json();
                return
            }
            
            const responseBody = this.present(output);

            response.status(200).json(responseBody);
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: FindMeResponseDto): FindMeResponseDto {
        const response: FindMeResponseDto = {
            user: {
                id: input.user.id,
                name: input.user.name,
                email: input.user.email,
            },
        };

        return response;
    }
}
