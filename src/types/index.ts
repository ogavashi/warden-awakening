import { SCENE_KEYS, tags } from "@common";
import {
  AreaComp,
  AudioPlay,
  AudioPlayOpt,
  BodyComp,
  GameObj,
  HealthComp,
  KaboomCtx,
  OpacityComp,
  PosComp,
  SpriteComp,
  StateComp,
  Vec2,
} from "kaboom";

export interface Scenes {
  [key: string]: (engine: KaboomCtx) => Promise<void>;
}

export enum Directions {
  UP = "up",
  RIGHT = "right",
  DOWN = "down",
  LEFT = "left",
}

export enum Locale {
  ENG = "english",
  UKR = "ukrainian",
}

export type GameObject = GameObj<SpriteComp | AreaComp | BodyComp | PosComp | OpacityComp>;

export type PlayerInstance = GameObject &
  StateComp & {
    speed: number;
    attackPower: number;
    direction: Directions;
    isAttacking: boolean;
    hasCooldown: boolean;
    isBlocking: boolean;
    hasShieldCooldown: boolean;
    blockingTime: number;
  };

export type SlimeInstance = GameObject &
  StateComp &
  HealthComp & {
    speed: number;
    attackPower: number;
    prevX: number;
    prevY: number;
    counter: number;
    waitTime: number;
    actionTime: number;
    framesCounter: number;
    isDefeated: boolean;
  };

export type OldmanInstance = GameObject & StateComp;

export type TraderInstance = GameObject & StateComp;

export type CoinInstance = GameObject & StateComp;

export type GhostInstance = GameObject &
  HealthComp &
  StateComp & {
    isAttacking: boolean;
    attackPower: number;
    prevPos: Vec2;
    isWaiting: boolean;
    isDefeated: boolean;
  };

export type PressButtonInstance = GameObject &
  StateComp & {
    isButton: boolean;
  };

export type BoxInstance = GameObject &
  StateComp & {
    isPlaced: boolean;
  };

export type GameInstance = PlayerInstance | SlimeInstance;

export type GameEntity = SlimeInstance | PlayerInstance | GhostInstance;

export interface WorldEntities {
  player: GameObject | null;
  slimes: GameObject[];
}

export interface HouseEntities {
  oldMan: GameObject | null;
  player: GameObject | null;
}

export interface ShopEntities {
  trader: GameObject | null;
  player: GameObject | null;
}

export interface DungeonEntities {
  player: GameObject | null;
  ghost: GameObject | null;
  pressButtons: GameObj<SpriteComp | AreaComp | PosComp | OpacityComp>[];
  boxes: GameObj<SpriteComp | AreaComp | PosComp | OpacityComp>[];
}

export type PrevScene = keyof typeof SCENE_KEYS | null;

export interface GlobalStateManagerInstance {
  setFreezePlayer: (val: boolean) => void;
  getFreezePlayer: () => boolean;
  setFontSize: (val: number) => void;
  getFontSize: () => number;
  setLocale: (val: Locale) => void;
  getLocale: () => Locale;
  setPrevScene: (val: PrevScene) => void;
  getPrevScene: () => PrevScene;
  setIsPuzzleSolved: (val: boolean) => void;
  getIsPuzzleSolved: () => boolean;
  setIsSonSaved: (val: boolean) => void;
  getIsSonSaved: () => boolean;
}

export type ActiveAudio = {
  [key in string]: AudioPlay;
};

export interface AudioStateManagerInstance {
  playSound: (engine: KaboomCtx, soundName: string, options: AudioPlayOpt) => AudioPlay;
  stopSound: (soundName: string) => void;
  stopAll: () => void;
}

export interface OldmanStateManagerInstance {
  setTalkedNum: (val: number) => void;
  getTalkedNum: () => number;
}

export interface PlayerStateManagerInstance {
  setHasSword: (val: boolean) => void;
  getHasSword: () => boolean;
  setHasShield: (val: boolean) => void;
  getHasShield: () => boolean;
  getMaxHealth: () => number;
  setHealth: (val: number) => void;
  getHealth: () => number;
  setHasCageKey: (val: boolean) => void;
  getHasCageKey: () => boolean;
  setCoinsCollected: (val: number) => void;
  getCoinsCollected: () => number;
}

export type Tag = keyof typeof tags;

export interface Map {
  compressionlevel: number;
  height: number;
  infinite: boolean;
  layers: Layer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: Tileset[];
  tilewidth: number;
  type: string;
  version: string;
  width: number;
}

export interface Layer {
  data?: number[];
  height?: number;
  id: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  width?: number;
  x: number;
  y: number;
  draworder?: string;
  objects?: Object[];
}

export interface Object {
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  point?: boolean;
}

export interface Tileset {
  columns: number;
  firstgid: number;
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tileheight: number;
  tilewidth: number;
}
