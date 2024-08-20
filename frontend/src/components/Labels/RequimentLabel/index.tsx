
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

const RequimentLabel = ({isError, messageSucess, messageError}: {isError: boolean, messageSucess: string, messageError: string}) => {
    const colorTextScheme = `${ isError ? 'text-error-color' : 'text-sucess-color'}`
    const colorBackgroundScheme = `${ isError ? 'bg-error-background' : 'bg-sucess-background'}`

    return (
        <div className={`${ colorBackgroundScheme } ${colorTextScheme} w-full flex gap-1 p-1 flex-column items-center rounded-sm px-2 py-1.5`}>
            {
                isError ? <FontAwesomeIcon icon={faCircleExclamation} /> : <FontAwesomeIcon icon={faCheck} />
            }
            <p>
                {
                    isError ? messageError : messageSucess
                }
            </p>
        </div>
    )
}

export default RequimentLabel