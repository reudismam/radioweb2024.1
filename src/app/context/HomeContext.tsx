'use client'

import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";

type HomeContextData = {
    playing: boolean;
    volume: number;
    audioRef: RefObject<HTMLAudioElement>;
    configPlayPause: () => void;
    configVolume: (value: number) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {
    const [playing, isPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audio, setAudio] = useState<HTMLAudioElement>(null);
    const [audioURL, setAudioURL] = useState(`audios/audio1.mp3`);
    const [volume, setVolume] = useState(1);
    const [gain, setGain] = useState<GainNode>();

    useEffect(()=>{
        configAudio();
    }, []);

    const configPlayPause = () => {
        if (playing) {
            pause();
        }
        else {
            play();
        }
        isPlaying(!playing);
    }

    const configVolume = (value: number) => {
        if (!gain) return;
        setVolume(value);
        gain.gain.value = value;
    }

    const play = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.play();

    }

    const pause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.pause();

    }

    const configAudio = () => {
        /*const newAudio = new Audio(audioURL);
        alert("aqui");
        //if (!audio) return;
        alert("aqui 2");
        const audioContext = new AudioContext();
        alert("aqui 3");
        const media = audioContext.createMediaElementSource(newAudio);
        const newGain = audioContext.createGain();
        media.connect(newGain);
        newGain.connect(audioContext.destination);
        setAudio(newAudio);
        setGain(newGain);*/
    }

    return (
        <HomeContext.Provider value={
            {
                playing,
                volume,
                audioRef,
                configPlayPause,
                configVolume
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;