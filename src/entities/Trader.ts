import { animationKeys, config, tags } from "@common";
import { Directions, PlayerInstance, TraderInstance } from "@types";
import { playAnimIfNotPlaying } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

export const generateTrader = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.trader.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(2, 4), 13, 15) }),
    engine.body({ isStatic: true }),
    engine.pos(pos),
    engine.opacity(),
    tags.oldman,
  ];
};

export const startTraderInteraction = async (trader: TraderInstance, player: PlayerInstance) => {
  if (player.direction === Directions.LEFT) {
    trader.flipX = true;
    playAnimIfNotPlaying(trader, animationKeys.trader.side);
  }
  if (player.direction === Directions.RIGHT) {
    trader.flipX = false;
    playAnimIfNotPlaying(trader, animationKeys.trader.side);
  }
  if (player.direction === Directions.DOWN) {
    playAnimIfNotPlaying(trader, animationKeys.trader.up);
  }
};
