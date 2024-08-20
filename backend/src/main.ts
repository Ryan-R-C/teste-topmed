import { ApiExpress } from "./infra/api/express/api.express";
import { CreateUserRoute } from "./infra/api/express/routes/user/create-user.express.route";
import { FindMeRoute } from "./infra/api/express/routes/auth/find-me.express.route";
import { ListUserRoute } from "./infra/api/express/routes/user/list-user.express.route";
import { LoginRoute } from "./infra/api/express/routes/auth/login.express.route";
import { LogRepositoryPrisma } from "./infra/repositories/user/logs.repository.prisma";
import { UserRepositoryPrisma } from "./infra/repositories/user/user.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateUserUsecase } from "./usecases/create-user/create-user.usecase";
import { FindMeUsecase } from "./usecases/find-me/find-me.usecase";
import { ListUserUsecase } from "./usecases/list-user/list-user.usecase";
import { LoginUsecase } from "./usecases/login/login.usecase";

function main() {

    const userRepository = UserRepositoryPrisma.create(prisma);
    const logRepository = LogRepositoryPrisma.create(prisma);

    const createUserUsecase = CreateUserUsecase.create(userRepository);
    const listUserUsecase = ListUserUsecase.create(userRepository);
    const findMeUsecase = FindMeUsecase.create(userRepository);
    const loginUserUsecase = LoginUsecase.create(userRepository, logRepository);

    const createRoute = CreateUserRoute.create(createUserUsecase);
    const listRoute = ListUserRoute.create(listUserUsecase);
    const findMeRout = FindMeRoute.create(findMeUsecase);
    const loginRoute = LoginRoute.create(loginUserUsecase);

    const api = ApiExpress.create([createRoute, listRoute, loginRoute, findMeRout]);
    const port = 8000;
    api.start(port);
}

main();