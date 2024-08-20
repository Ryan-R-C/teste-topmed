import MainButton from "../../components/Buttons/MainButton"
import CardContainer from "../../components/Containers/CardContainer"
import MainContentCard from "../../components/Containers/MainContentCard"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthProvider"
import { useEffect } from "react"
import Spinner from "../../components/Buttons/Spinner"

export const Home = () => {
    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/')
    }

    const { findAuth, isError, loadingSubmit, auth} = useAuth()

    const handleFindUser = async () => {
        const foundAuth = findAuth()
        if(!foundAuth) navigate('/')
    }

    useEffect(
        () => {
            handleFindUser()
        }, []
    )

    
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CardContainer>
                <MainContentCard>
                    {
                    loadingSubmit ? <Spinner/> : <div className="w-full">
                        <h1 className="text-2xl">Bem vindo, {auth?.name}!</h1>
                        <h2 className="text-xs text-secondary-text-color">Você realizou o login e está dentro do sistema.</h2>
                    </div>
                    }

                    <img src="/email-verify.png" alt="" />
                    <MainButton onClick={handleClickLogin}>Login</MainButton>
                </MainContentCard>
            </CardContainer>
        </div>
    )
}