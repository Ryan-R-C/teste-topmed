import { Request, Response } from "express";
import {
    ListUserOutputDto,
    ListUserUsecase,
} from "../../../../../usecases/list-user/list-user.usecase";
import { HttpMethod, Route } from "../route";

export type ListUserResponseDto = {
    users: {
        id: string;
        name: string;
        email: string;
    }[];
};

export class ListUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listUserService: ListUserUsecase
    ) {}

    public static create(listUserService: ListUserUsecase) {
        return new ListUserRoute(
            "/users",
            HttpMethod.GET,
            listUserService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listUserService.execute();

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

    private present(input: ListUserOutputDto): ListUserResponseDto {
        const response: ListUserResponseDto = {
            users: input.users.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
            })),
        };

        return response;
    }
}
