import { Log } from "../entity/logs";

export interface LogGateway {
    save(user: Log): Promise<void>;
    list(userId: string, isValid: boolean, dateGte: Date): Promise<Log[]>;
}