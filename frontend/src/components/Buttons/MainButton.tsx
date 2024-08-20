import { IButtonProps } from "../../interfaces/components/IButtonProps"

const MainButton : React.FC<IButtonProps> = ({
    children,
    type,
    onClick = () => {},
    props
    }) => {
    return (
        <button type={type} onClick={onClick} className="max-w-32 w-full rounded-2xl bg-secondary-color p-2 text-white text-xs" {...props}>
            {
                children
            }
        </button>
    )
}

export default MainButton