import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IInputProps } from "../../interfaces/components/IInputProps.ts"

export const InputIcon = (
    {
        name,
        placeholder,
        type,
        icon,
        ...rest
    } : IInputIconProps
) => {
    return (
        <label htmlFor={name} className="relative w-full"> 
            <input type={type}
                name={name} id={name} placeholder={placeholder}
                {...rest}
                className="pl-10 pr-2 py-1 border-b-2" 
            /> 
            <div className="absolute inset-y-0 left-0 pl-3  
                        flex items-center  
                        pointer-events-none"> 
                <FontAwesomeIcon className="text-gray-400 text-sm" icon={icon} />
            </div> 
        </label> 
    )
}

interface IInputIconProps extends IInputProps {
    icon: IconProp
} 