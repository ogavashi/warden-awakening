import { animationKeys, config, tags } from "@common";
import { KaboomCtx, Vec2 } from "kaboom";

export const generateSlime = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.slime.idleDown }),
    engine.area({ shape: new engine.Rect(engine.vec2(0, 6), 16, 10) }),
    engine.body(),
    engine.pos(pos),
    engine.offscreen(),
    engine.opacity(),
    {
      speed: 100,
      attackPower: 0.5,
    },
    tags.player,
  ];
};
