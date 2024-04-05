import { config, tags } from "@common";
import { KaboomCtx, Vec2 } from "kaboom";

export const generateBox = (engine: KaboomCtx, pos: Vec2) => {
  const box = [
    engine.sprite(config.assetsName, { frame: 153 }),
    engine.area({ shape: new engine.Rect(engine.vec2(0, 2), 14, 14) }),
    engine.body({ mass: 2 }),
    engine.pos(pos),
    engine.opacity(),
    tags.box,
  ];

  return box;
};
