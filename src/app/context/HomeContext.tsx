'use client'

import { createContext, ReactNode, RefObject, useEffect, useRef, useState } from "react";

type HomeContextData = {
    playing: boolean;
    volume: number;
    configPlayPause: () => void;
    configVolume: (value: number) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({children}: ProviderProps) => {
    const [playing, isPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();
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
        if (!audio) return;
        audio.play();

    }

    const pause = () => {
        if (!audio) return;
        audio.pause();

    }

    const configAudio = () => {
        const newAudio = new Audio(audioURL);
        setAudio(newAudio);
        if (!newAudio) return;
        const audioContext = new AudioContext();
        const media = audioContext.createMediaElementSource(newAudio);
        const newGain = audioContext.createGain();
        media.connect(newGain);
        newGain.connect(audioContext.destination);
        setGain(newGain);
    }

    return (
        <HomeContext.Provider value={
            {
                playing,
                volume,
                configPlayPause,
                configVolume
            }
        }>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;