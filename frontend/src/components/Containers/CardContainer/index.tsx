import './CardContainer.css'
import { ReactNode } from "react"

const CardContainer = ({ children } : {children?: ReactNode}) => {
    return (
        <div className="max-w-4xl flex bg-white min-h-96 rounded-xl overflow-hidden external-shadow">
            { children }
        </div>
    )
}

export default CardContainer