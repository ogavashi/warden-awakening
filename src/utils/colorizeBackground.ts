import { KaboomCtx } from "kaboom";

export const colorizeBackground = (engine: KaboomCtx, r: number, g: number, b: number) => {
  const { width, height } = engine.canvas;
  const color = engine.color(r, g, b);

  engine.add([engine.rect(width, height), color, engine.fixed()]);
};
