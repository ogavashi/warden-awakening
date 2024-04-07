import { animationKeys, tags } from "@common";
import { playerState } from "@state";

import { KaboomCtx } from "kaboom";

export const coinsBar = (engine: KaboomCtx) => {
  const coinsNumber = playerState.getCoinsCollected();

  const coinsContainer = engine.add([engine.pos(1070, 20), engine.fixed(), tags.coinsContainer]);

  coinsContainer.add([engine.sprite(animationKeys.coin.static), engine.scale(4), engine.pos(0, 0)]);

  coinsContainer.add([
    engine.text(`:${coinsNumber}`, {
      width: 750,
      lineSpacing: 2,
      letterSpacing: 2,
    }),
    engine.color(0, 0, 0),
    engine.pos(50, 15),
    engine.fixed(),
  ]);

  return coinsContainer;
};
