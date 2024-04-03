import { animationKeys, config, sounds, tags } from "@common";
import { CoinInstance } from "@types";
import { KaboomCtx, Vec2 } from "kaboom";

export const generateCoin = (engine: KaboomCtx, pos: Vec2) => {
  const coin = [
    engine.sprite(config.assetsName, { anim: animationKeys.coin.idle }),
    engine.area({ shape: new engine.Rect(engine.vec2(2, 2), 7, 7) }),
    engine.body({ isStatic: true }),
    engine.pos(pos),
    engine.opacity(),
    tags.coin,
  ];

  return coin;
};

export const addCoinAI = (engine: KaboomCtx, coin: CoinInstance) => {
  coin.onCollide(tags.player, (player) => {
    engine.play(sounds.conin.collect.name, {
      volume: config.effectsVolums,
    });

    coin.destroy();
  });
};
