import { tags } from "@common";
import {
  AreaComp,
  BodyComp,
  GameObj,
  HealthComp,
  KaboomCtx,
  OpacityComp,
  PosComp,
  SpriteComp,
  StateComp,
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
  };

export type OldmanInstance = GameObject & StateComp;

export type TraderInstance = GameObject & StateComp;

export type CoinInstance = GameObject & StateComp;

export type GameInstance = PlayerInstance | SlimeInstance;

export type GameEntity = SlimeInstance;

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

export interface GlobalStateManagerInstance {
  setFreezePlayer: (val: boolean) => void;
  getFreezePlayer: () => boolean;
  setFontSize: (val: number) => void;
  getFontSize: () => number;
  setLocale: (val: Locale) => void;
  getLocale: () => Locale;
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
  setHasBossKey: (val: boolean) => void;
  getHasBossKey: () => boolean;
  setHasCageKey: (val: boolean) => void;
  getHasCageKey: () => boolean;
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
