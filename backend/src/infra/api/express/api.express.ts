import { Api } from "../api";
import express, { Express } from "express";
import { Route } from "./routes/route";
import cors from 'cors'

export class ApiExpress implements Api {
    private app: Express;

    private constructor(routes: Route[]) {
        this.app = express();
        this.app.use(express.json());
        this.configCors()
        this.addRoutes(routes);
    }

    public static create(routes: Route[]) {
        return new ApiExpress(routes);
    }

    private addRoutes(routes: Route[]) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();

            this.app[method](path, handler);
        });
    }

    private configCors(){
        this.app.use(cors({ origin: '*' }))
        this.app.use((_, res, next) => {
          res.header('Access-Control-Allow-Origin', '*')
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
          next()
        })
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            this.listRoutes();
        });
    }

    private listRoutes() {
        const routes = this.app._router.stack
            .filter((route: any) => route.route)
            .map((route: any) => {
                return {
                    path: route.route.path,
                    method: route.route.stack[0].method,
                };
            });

        console.log(routes);
    }
}
