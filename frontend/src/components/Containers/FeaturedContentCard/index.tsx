import './FeaturedContentCard.css'
import { ReactNode } from "react"

const FeaturedContentCard = ({ children } : {children?: ReactNode}) => {
    return (
        <div className="w-52 max-w-56 min-h-80 p-6 bg-main-color text-white flex flex-col items-center gap-9 inner-shadow">
            { children }
        </div>
    )
}

export default FeaturedContentCard