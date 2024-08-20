import React, { useState, useEffect, useRef } from 'react';
import CardContainer from "../../components/Containers/CardContainer";
import MainContentCard from "../../components/Containers/MainContentCard";
import FeaturedContentCard from "../../components/Containers/FeaturedContentCard";
import FeaturedButton from "../../components/Buttons/FeaturedButton";
import RequimentLabel from "../../components/Labels/RequimentLabel";
import { useNavigate } from "react-router-dom";

type AccessPermission = {
    item: string;
    isError: boolean;
    messageError: string;
    messageSucess: string;
};

export const RequirementsTesting: React.FC = () => {
    const [accessPermissions, setAccessPermissions] = useState<AccessPermission[]>([
        {
            item: 'camera-found',
            isError: false,
            messageError: 'Câmera não encontrada.',
            messageSucess: 'Câmera disponível.',
        },
        {
            item: 'camera-access',
            isError: true,
            messageError: 'Acesso à câmera bloqueado.',
            messageSucess: 'Acesso à câmera disponível.',
        },
        {
            item: 'microphone-found',
            isError: false,
            messageError: 'Microfone não encontrado.',
            messageSucess: 'Microfone disponível.',
        },
        {
            item: 'microphone-access',
            isError: true,
            messageError: 'Acesso ao microfone bloqueado.',
            messageSucess: 'Acesso ao microfone disponível.',
        },
        {
            item: 'internet-speed',
            isError: true,
            messageError: 'Velocidade da internet insuficiente.',
            messageSucess: 'Velocidade da internet suficiente.',
        },
    ]);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const handleClickRequirements = () => {
        navigate('/');
    };

    useEffect(() => {
        const checkPermissions = async () => {
            const updatedPermissions = [...accessPermissions];
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const hasCamera = devices.some(device => device.kind === 'videoinput');
                const hasMicrophone = devices.some(device => device.kind === 'audioinput');

                updatedPermissions.forEach(permission => {
                    if (permission.item === 'camera-found') {
                        permission.isError = !hasCamera;
                    }
                    if (permission.item === 'camera-access') {
                        permission.isError = !hasCamera;
                    }
                    if (permission.item === 'microphone-found') {
                        permission.isError = !hasMicrophone;
                    }
                    if (permission.item === 'microphone-access') {
                        permission.isError = !hasMicrophone;
                    }
                });

                const start = performance.now();
                await fetch('https://www.google.com', { method: 'HEAD', mode: 'no-cors' });
                const end = performance.now();
                const speedMs = end - start;

                updatedPermissions.forEach(permission => {
                    if (permission.item === 'internet-speed') {
                        permission.isError = speedMs >= 200;
                    }
                });

                setAccessPermissions(updatedPermissions);

                if (hasCamera) {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user', width: 1280, height: 720 },
                        audio: true
                    });

                    setStream(mediaStream);

                    if (videoRef.current) {
                        videoRef.current.srcObject = mediaStream;
                        videoRef.current.onloadedmetadata = () => {
                            videoRef.current?.play();
                        };
                        videoRef.current.onerror = (e) => {
                            console.error('Erro ao carregar o vídeo:', e);
                        };
                    }
                }
                
            } catch (error) {
                console.error('Erro ao acessar mídia:', error);
                updatedPermissions.forEach(permission => {
                    if (permission.item === 'camera-found' || permission.item === 'camera-access') {
                        permission.isError = true;
                    }
                    if (permission.item === 'microphone-found' || permission.item === 'microphone-access') {
                        permission.isError = true;
                    }
                    if (permission.item === 'internet-speed') {
                        permission.isError = true;
                    }
                });
                setAccessPermissions(updatedPermissions);
            }
        };

        checkPermissions();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <CardContainer>
                <MainContentCard>
                    <div className="w-full">
                        <h1 className="text-2xl">Teste de requisitos técnicos</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            accessPermissions.map(
                                (permission, index) => (
                                    <RequimentLabel
                                        key={index}
                                        isError={permission.isError}
                                        messageError={permission.messageError}
                                        messageSucess={permission.messageSucess}
                                    />
                                )
                            )
                        }
                    </div>
                </MainContentCard>
                <FeaturedContentCard>
                    <div className="flex flex-row items-center gap-1 w-full">
                        <img src="/camera.png" alt="Câmera" />
                        <h3 className="text-xs">Câmera</h3>
                    </div>
                    <div className="w-full h-28 bg-red-950 relative">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            playsInline
                        />
                    </div>
                    <FeaturedButton onClick={handleClickRequirements}>Concluído</FeaturedButton>
                </FeaturedContentCard>
            </CardContainer>
        </div>
    );
};
