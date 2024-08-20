import { ReactNode } from "react"

const MainContentCard = ({ children } : {children?: ReactNode}) => {
    return (
        <div className="max-w-md w-72 min-h-80 flex flex-col items-center justify-between p-6">
            <div className="flex flex-col items-center gap-6">{ children }</div>
            <div className="w-full flex justify-between justify-self-end">
                <img src="/topmed_logo.png" className="object-contain w-[52px]" alt="" />
                <img src="/nextplus_logo.png" className="object-contain w-[35px]"  alt="" />
            </div>
        </div>
    )
}

export default MainContentCard