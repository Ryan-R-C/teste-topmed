import { IButtonProps } from "../../interfaces/components/IButtonProps"

const FeaturedButton : React.FC<IButtonProps> = ({
    children,
    onClick = () => {},
    ...props
    }) => {  
    return (
        <button onClick={onClick} className="max-w-32 w-full rounded-2xl p-2 text-secondary-color bg-alternative-text-color text-xs border border-main-color" {...props}>
            {
                children
            }
        </button>
    )
}

export default FeaturedButton