export type LogProps = {
    id: string;
    userId: string;
    isValid: boolean;
    createdAt: Date;
};

export class Log {
    private constructor(private props: LogProps) {}

    public static create(userId: string, isValid: boolean) {
        return new Log({
            id: crypto.randomUUID().toString(),
            userId,
            isValid,
            createdAt: new Date()
        });
    }

    public static with(props: LogProps) {
        return new Log(props);
    }

    public get id() {
        return this.props.id;
    }

    public get userId(){
        return this.props.userId;
    }

    public get isValid(){
        return this.props.isValid;
    }
    
    public get createdAt(){
        return this.props.createdAt;
    }
}
