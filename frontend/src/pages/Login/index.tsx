import CardContainer from "../../components/Containers/CardContainer"
import MainContentCard from "../../components/Containers/MainContentCard"
import FeaturedContentCard from "../../components/Containers/FeaturedContentCard"
import { useNavigate } from "react-router-dom"
import FeaturedButton from "../../components/Buttons/FeaturedButton"
import MainButton from "../../components/Buttons/MainButton"
import { InputIcon } from "../../components/Inputs/InputIcon"
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthProvider"
import RequimentLabel from "../../components/Labels/RequimentLabel"

export const Login = () => {
    const navigate = useNavigate()
    
    const handleClickRequirements = () => {
        navigate('requirements-testing')
    }

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const { login, isError, loadingSubmit} = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const isValidLogin = await login({
            email,
            password
        })

        if(isValidLogin) navigate('/home')
    }
    
    
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CardContainer>
                <MainContentCard>
                    <div className="w-full">
                        <h1 className="text-2xl">Bem Vindo,</h1>
                        <h2 className="text-xs text-secondary-text-color">Faça o login para continuar.</h2>
                    </div>

                    <form className="w-full flex flex-col items-center gap-6" onSubmit={e => handleSubmit(e)}>
                        <InputIcon type="text" name="email" icon={faUser} placeholder="Usuário" value={email} onChange={e => setEmail(e.target.value)} />
                        <InputIcon type="text" name="password" icon={faLock} placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                        <MainButton props={{disabled: loadingSubmit}} type="submit">Entrar</MainButton>
                    </form>
                    <a href="/forgot-password" className="text-xs text-secondary-color">Esqueceu a senha</a>
                    
                    {
                        isError && <RequimentLabel isError={true} messageError={"Login incorreto"}  messageSucess={""}/>
                    }

                </MainContentCard>
                <FeaturedContentCard>
                    <div>
                        <h2 className="text-xl">Teste de requisitos</h2>
                        <h3 className="text-xs text-secondary-alternative-color">Teste seus acessos a câmera, microfone e velocidade da internet.</h3>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1">
                        <img src="/sound.png" alt="" />
                        <img src="/camera.png" alt="" />
                    </div>
                    <FeaturedButton onClick={handleClickRequirements}>Realizar Teste</FeaturedButton>
                </FeaturedContentCard>
            </CardContainer>
        </div>
    )
}