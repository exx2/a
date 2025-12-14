import React from 'react';
import { ASSETS } from '../constants';

interface EndScreenProps {
  duration: number;
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ duration, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#FFA800] text-center px-4 animate-pop-in">
      <img src={ASSETS.LOGO} alt="Logo" className="h-32 mb-8 drop-shadow-md" />
      
      <h2 className="text-4xl md:text-6xl text-white drop-shadow-[2px_2px_0_#000] mb-6">
        GRATULACJE!
      </h2>
      
      <p className="text-2xl md:text-3xl text-black mb-2">
        Udało Ci się dopasować wszystkie obrazki!
      </p>
      
      <p className="text-xl md:text-2xl text-white drop-shadow-sm mb-12">
        Twój czas: <span className="font-bold text-black">{duration} sekund</span>
      </p>

      <button 
        onClick={onRestart}
        className="bg-black text-[#FFA800] border-4 border-black text-2xl px-10 py-3 rounded-xl 
                   hover:bg-[#333] hover:scale-105 transition-all duration-300 cursor-pointer shadow-xl"
      >
        ZAGRAJ PONOWNIE
      </button>
    </div>
  );
};