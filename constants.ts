import { GameItem } from './types';

const BASE_URL = 'https://autyzmowo.pl/gry/dopasowanie/';

export const ASSETS = {
  LOGO: 'https://autyzmowo.pl/gry/memory/logo-autyzmowo-biale.svg', // Reusing logo from memory game context
};

export const GAME_ITEMS: GameItem[] = [
  {
    id: 'chwalenie',
    name: 'Chwalenie innych',
    imageSrc: `${BASE_URL}grafika-chwalenie.webp`,
    labelSrc: `${BASE_URL}napis-chwalenie.png`,
    videoSrc: `${BASE_URL}anim-pp-1.mp4`,
  },
  {
    id: 'dzielenie',
    name: 'Dzielenie się zabawką',
    imageSrc: `${BASE_URL}gafika-dzielenie.webp`, // Preserving typo from prompt instructions
    labelSrc: `${BASE_URL}napis-dzielenie.png`,
    videoSrc: `${BASE_URL}anim-pp-2.mp4`,
  },
  {
    id: 'pomoc',
    name: 'Wzajemna pomoc',
    imageSrc: `${BASE_URL}grafika-pomoc.webp`,
    labelSrc: `${BASE_URL}napis-pomoc.png`,
    videoSrc: `${BASE_URL}anim-pp-3.mp4`,
  },
  {
    id: 'przywitanie',
    name: 'Przywitanie się',
    imageSrc: `${BASE_URL}grafika-przywitanie.webp`,
    labelSrc: `${BASE_URL}napis-przywitanie.png`,
    videoSrc: `${BASE_URL}anim-pp-4.mp4`,
  },
  {
    id: 'zabawa',
    name: 'Wspólna zabawa',
    imageSrc: `${BASE_URL}grafika-zabawa.webp`,
    labelSrc: `${BASE_URL}napis-zabawa.png`,
    videoSrc: `${BASE_URL}anim-pp-5.mp4`,
  },
];