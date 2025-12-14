import React, { useState, useEffect, useRef } from 'react';
import { GAME_ITEMS, ASSETS } from '../constants';

interface IntroScreenProps {
  onStartGame: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStartGame }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [animState, setAnimState] = useState<'in' | 'playing' | 'out'>('in');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // When animation state becomes 'playing', ensure video starts
    if (animState === 'playing' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
    }
  }, [animState]);

  const handleVideoEnded = () => {
    setAnimState('out');
    // Wait for slide out animation (1s) then move to next
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % GAME_ITEMS.length);
      setAnimState('in');
    }, 1000);
  };

  const handleAnimationEnd = () => {
    if (animState === 'in') {
        setAnimState('playing');
    }
  };

  const currentItem = GAME_ITEMS[currentVideoIndex];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full relative pt-4 pb-4 box-border">
      {/* Header */}
      <div className="z-20 flex flex-col items-center text-center px-4 fade-in">
        <img src={ASSETS.LOGO} alt="Autyzm i My" className="h-20 md:h-28 mb-2 drop-shadow-md" />
        
        {/* Text container with increased margin-top to balance spacing between Logo and Video */}
        <div className="mt-6 md:mt-10 flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl text-white drop-shadow-[2px_2px_0_#000] uppercase tracking-wide">
            Dopasuj odpowiedni rysunek<br/>do podpisu czynności społecznych
          </h1>
          <p className="text-black text-lg md:text-xl mt-4 max-w-2xl drop-shadow-none font-bold">
            Przeciągnij prawidłowy opis pod odpowiedni obrazek.
          </p>
        </div>
      </div>

      {/* Falling Video Container - Adjusted position (pt-24) and size (w-[90%] md:w-[70%] lg:w-[50%]) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-24 md:pt-32">
        <div 
          className={`
            relative bg-white p-4 rounded-xl shadow-2xl border-8 border-white
            w-[90%] md:w-[70%] lg:w-[50%] aspect-video overflow-hidden
            ${animState === 'in' ? 'animate-slide-in' : ''}
            ${animState === 'out' ? 'animate-slide-out' : ''}
          `}
          onAnimationEnd={handleAnimationEnd}
        >
          {currentItem && (
             <video
                ref={videoRef}
                src={currentItem.videoSrc}
                className="w-full h-full object-cover rounded-lg"
                muted
                playsInline
                onEnded={handleVideoEnded}
             />
          )}
        </div>
      </div>

      {/* Start Button Area */}
      <div className="z-20 mt-auto flex flex-col items-center pb-2 px-4 w-full">
        <button 
          onClick={onStartGame}
          className="bg-black text-white border-4 border-black text-2xl md:text-3xl px-12 py-3 rounded-2xl 
                     hover:bg-[#333] hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer pointer-events-auto mb-4"
        >
          ZAGRAJ
        </button>
        <div className="max-w-4xl text-center text-xs md:text-sm text-black/80 font-sans font-bold">
            Wciśnij F11 - Gra pełnoekranowa. Aby wrócić do prezentacji (przełączyć okna), naciśnij kombinację klawiszy ALT + TAB jednocześnie lub ponownie wciśnij F11 i kliknij ikonę PowerPoint na pasku zadań.
        </div>
      </div>
    </div>
  );
};