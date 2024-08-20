import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { LoginInputDto, LoginUsecase } from "../../../../../usecases/login/login.usecase";

export type LoginResponseDto = {
    token: string;
};

export class LoginRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly LoginService: LoginUsecase
    ) {}

    public static create(LoginService: LoginUsecase) {
        return new LoginRoute(
            "/login",
            HttpMethod.POST,
            LoginService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { password, email } = request.body;

            const input: LoginInputDto = {
                password,
                email,
            };

            const output: LoginResponseDto | null =
                await this.LoginService.execute(input);

                
            if(!output){
                response.status(401).json().send();
                return
            }

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: LoginResponseDto): LoginResponseDto {
        const response = { token: input.token };
        return response;
    }
}
