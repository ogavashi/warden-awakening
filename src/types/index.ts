import { tags } from "@common";
import {
  AreaComp,
  BodyComp,
  GameObj,
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

export type GameObject = GameObj<SpriteComp | AreaComp | BodyComp | PosComp | OpacityComp>;

export type PlayerInstance = GameObject &
  StateComp & {
    speed: number;
    attackPower: number;
    direction: Directions;
    isAttacking: boolean;
  };

export type SlimeInstance = GameObject &
  StateComp & {
    speed: number;
    attackPower: number;
  };

export type GameInstance = PlayerInstance | SlimeInstance;

export interface Entities {
  player: GameObject | null;
  slimes: GameObject[];
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
