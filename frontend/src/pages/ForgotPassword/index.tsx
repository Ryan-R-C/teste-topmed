import MainButton from "../../components/Buttons/MainButton"
import CardContainer from "../../components/Containers/CardContainer"
import MainContentCard from "../../components/Containers/MainContentCard"
import { useNavigate } from "react-router-dom"

export const ForgotPassword = () => {
    const navigate = useNavigate()
    
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CardContainer>
                <MainContentCard>
                    <div className="w-full">
                        <h1 className="text-2xl">Esqueceu sua senha?</h1>
                        <h2 className="text-xs text-secondary-text-color">Informe o endereço de e-mail cadastrado para receber o link de redefinição de senha.</h2>
                    </div>

                    <input className="border-b-2" type="text" />

                    <MainButton onClick={() => navigate('/email-sent')}>ENVIAR</MainButton>
                    <a href="/" className="text-xs text-secondary-color">Voltar</a>

                </MainContentCard>
            </CardContainer>
        </div>
    )
}