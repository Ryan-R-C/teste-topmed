import MainButton from "../../components/Buttons/MainButton"
import CardContainer from "../../components/Containers/CardContainer"
import MainContentCard from "../../components/Containers/MainContentCard"
import { useNavigate } from "react-router-dom"

export const SentEmail = () => {
    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/')
    }
    
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CardContainer>
                <MainContentCard>
                    <div className="w-full">
                        <h1 className="text-2xl">E-mail enviado!</h1>
                        <h2 className="text-xs text-secondary-text-color">Verifique sua caixa de entrada e acesso o link para redefinição de senha.</h2>
                    </div>
                    <img src="/email-verify.png" alt="" />
                    <MainButton onClick={handleClickLogin}>Login</MainButton>
                </MainContentCard>
            </CardContainer>
        </div>
    )
}