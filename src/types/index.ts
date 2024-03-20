import { KaboomCtx } from "kaboom";

export interface Scenes {
  [key: string]: (engine: KaboomCtx) => Promise<void>;
}
