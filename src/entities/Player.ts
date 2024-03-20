import { animationKeys, config, tags } from "@common";
import { Directions } from "@types";
import { KaboomCtx, Vec2 } from "kaboom";

export const generatePlayer = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.playerIdleDown }),
    engine.area({ shape: new engine.Rect(engine.vec2(3, 4), 10, 12) }),
    engine.body(),
    engine.pos(pos),
    engine.opacity(),
    {
      speed: 100,
      attackPower: 1,
      direction: Directions.DOWN,
      isAttacking: false,
    },
    tags.player,
  ];
};
