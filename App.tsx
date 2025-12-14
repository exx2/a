import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [gameDuration, setGameDuration] = useState(0);

  const handleStartGame = () => {
    setGameState(GameState.PLAYING);
  };

  const handleFinishGame = (duration: number) => {
    setGameDuration(duration);
    setGameState(GameState.FINISHED);
  };

  const handleRestart = () => {
    setGameState(GameState.INTRO);
    setGameDuration(0);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#FFA800]">
      {gameState === GameState.INTRO && (
        <IntroScreen onStartGame={handleStartGame} />
      )}
      {gameState === GameState.PLAYING && (
        <GameScreen onFinish={handleFinishGame} />
      )}
      {gameState === GameState.FINISHED && (
        <EndScreen duration={gameDuration} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;