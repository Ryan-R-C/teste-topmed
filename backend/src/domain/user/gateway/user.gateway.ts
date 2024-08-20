import { User, UserProps } from "../entity/user";

export interface UserGateway {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;
    find(filter: Partial<UserProps>): Promise<User | null>;
}