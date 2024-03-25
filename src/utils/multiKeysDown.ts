import { KaboomCtx, Key } from "kaboom";

export const multiKeysDown = (engine: KaboomCtx, keys: Key[]) =>
  keys.some((key) => engine.isKeyDown(key));
