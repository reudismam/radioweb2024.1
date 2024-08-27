'use client'

import { FaPause, FaPlay } from "react-icons/fa";
import { HomeContext } from "./context/HomeContext";
import { useContext } from "react";

export default function Home() {
  const {
    playing,
    volume,
    configPlayPause,
    configVolume
  } = useContext(HomeContext);
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <button onClick={() => configPlayPause()}>
           {
             playing ? (<FaPause />) : (<FaPlay />)
           }
           <input 
              type="range" 
              min="0" 
              max="1"
              value={volume}
              onChange={(e) => configVolume(Number(e.target.value))}
              step="0.01">
              
            </input>
          </button>
      </main>
  );
}
