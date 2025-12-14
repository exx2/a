import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  TouchSensor,
  MouseSensor,
  DragEndEvent,
  DragStartEvent,
  defaultDropAnimationSideEffects,
  DropAnimation
} from '@dnd-kit/core';
import { GAME_ITEMS } from '../constants';
import { GameItem } from '../types';

// --- Sub-components for DnD ---
import { useDraggable, useDroppable } from '@dnd-kit/core';

interface DraggableLabelProps {
  item: GameItem;
  isOverlay?: boolean;
}

const DraggableLabel: React.FC<DraggableLabelProps> = ({ item, isOverlay }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: { type: 'label', id: item.id }
  });

  const style = {
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      {...listeners} 
      {...attributes} 
      style={style}
      className={`cursor-grab active:cursor-grabbing touch-none transition-transform ${isOverlay ? 'scale-110 rotate-3' : 'hover:scale-105'}`}
    >
      <img 
        src={item.labelSrc} 
        alt={item.name} 
        // Changed to width-based sizing to ensure equal width for all labels
        className="w-32 md:w-48 lg:w-56 h-auto object-contain drop-shadow-lg select-none pointer-events-none" 
      />
    </div>
  );
};

interface DroppableImageProps {
  item: GameItem;
  isMatched: boolean;
  shaking: boolean;
}

const DroppableImage: React.FC<DroppableImageProps> = ({ item, isMatched, shaking }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: item.id,
    data: { type: 'image', id: item.id },
    disabled: isMatched
  });

  return (
    <div 
      ref={setNodeRef}
      className={`
        relative rounded-xl border-4 md:border-8 border-white bg-white shadow-xl overflow-hidden aspect-[16/9] w-full
        transition-all duration-300
        ${shaking ? 'animate-shake border-red-500' : ''}
        ${isOver && !isMatched ? 'scale-105 ring-4 ring-yellow-300' : ''}
      `}
    >
      {/* Background Image */}
      <img 
        src={item.imageSrc} 
        alt={item.name} 
        className="w-full h-full object-cover"
      />

      {/* Success Overlay */}
      {isMatched && (
        <div className="absolute inset-0 bg-[#FFA800] flex items-center justify-center animate-pop-in z-10">
          <img 
            src={item.labelSrc} 
            alt={item.name} 
            className="w-[85%] object-contain drop-shadow-md translate-y-[15px]" 
          />
        </div>
      )}
    </div>
  );
};

// --- Main Game Component ---

interface GameScreenProps {
  onFinish: (duration: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onFinish }) => {
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [startTime] = useState(Date.now());
  const [shuffledItems, setShuffledItems] = useState<GameItem[]>([]);

  // Configure sensors for best mobile/desktop experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
        activationConstraint: {
            distance: 8, // Require movement before drag starts to prevent accidental clicks
        },
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    // Shuffle the labels at the bottom, but keep images in specific layout
    const items = [...GAME_ITEMS];
    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setShuffledItems(items);
  }, []);

  useEffect(() => {
    if (matchedIds.length === GAME_ITEMS.length) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      setTimeout(() => onFinish(duration), 1000);
    }
  }, [matchedIds, onFinish, startTime]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Correct Match
    if (active.id === over.id) {
      setMatchedIds((prev) => [...prev, active.id as string]);
    } else {
      // Incorrect Match
      setShakeId(over.id as string);
      setTimeout(() => setShakeId(null), 500); // Reset shake after animation
    }
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const availableLabels = shuffledItems.filter(item => !matchedIds.includes(item.id));
  const activeItem = GAME_ITEMS.find(i => i.id === activeId);

  // Layout items: First 3, then 2 centered
  const topRowItems = GAME_ITEMS.slice(0, 3);
  const bottomRowItems = GAME_ITEMS.slice(3, 5);

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 py-2 md:py-6 relative">
        
        {/* Logo small */}
        <div className="flex justify-center mb-2 md:mb-4">
            <img src="https://autyzmowo.pl/gry/memory/logo-autyzmowo-biale.svg" className="h-12 md:h-16" alt="Logo"/>
        </div>

        <div className="text-center text-black mb-4">
             <h2 className="text-xl md:text-2xl uppercase font-bold drop-shadow-sm">Przeciągnij opis z dołu na właściwy obrazek</h2>
        </div>

        {/* Grid Area */}
        <div className="flex-grow flex flex-col justify-center gap-4 md:gap-8">
          
          {/* Top Row (3 items) */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 lg:gap-12 w-full">
            {topRowItems.map((item) => (
              <DroppableImage 
                key={item.id} 
                item={item} 
                isMatched={matchedIds.includes(item.id)}
                shaking={shakeId === item.id}
              />
            ))}
          </div>

          {/* Bottom Row (2 items centered) */}
          <div className="flex justify-center gap-2 md:gap-8 lg:gap-12 w-full">
            {bottomRowItems.map((item) => (
              <div key={item.id} className="w-[32%]"> 
                 {/* Match the width of 1/3 grid col roughly, accounting for gap */}
                <DroppableImage 
                  item={item} 
                  isMatched={matchedIds.includes(item.id)}
                  shaking={shakeId === item.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Labels Pool (Bottom) */}
        <div className="mt-auto pt-4 pb-4 md:pb-8 flex flex-wrap justify-center items-center gap-4 min-h-[100px]">
          {availableLabels.map((item) => (
            <div key={item.id} className="animate-pop-in">
              <DraggableLabel item={item} />
            </div>
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeId && activeItem ? (
          <DraggableLabel item={activeItem} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};