
export interface IButtonProps {
    type?: "submit" | "reset" | "button" | undefined;
    children?: React.ReactNode;
    props?: any;
    onClick?:
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
}