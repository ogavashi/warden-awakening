import { animationKeys, config, sounds, tags } from "@common";
import { playerState } from "@state";
import { CoinInstance } from "@types";
import { coinsBar } from "@ui";
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
  coin.onCollide(tags.player, () => {
    engine.play(sounds.conin.collect.name, {
      volume: config.effectsVolums,
    });

    playerState.setCoinsCollected(playerState.getCoinsCollected() + 1);

    engine.destroyAll(tags.coinsContainer);
    coinsBar(engine);

    coin.destroy();
  });
};
