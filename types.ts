export interface GameItem {
  id: string;
  imageSrc: string;
  labelSrc: string;
  videoSrc: string;
  name: string;
}

export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface DraggableData {
  id: string;
  type: 'label';
}

export interface DroppableData {
  id: string;
  type: 'image';
}