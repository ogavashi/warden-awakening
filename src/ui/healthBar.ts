import { animationKeys, tags } from "@common";
import { playerState } from "@state";
import { KaboomCtx } from "kaboom";

export const healthBar = (engine: KaboomCtx) => {
  let fullHearts = Math.floor(playerState.getHealth());
  let addHalfHeart = false;

  if (playerState.getHealth() - fullHearts === 0.5) {
    addHalfHeart = true;
  }

  let emptyHearts = playerState.getMaxHealth() - fullHearts - (addHalfHeart ? 1 : 0);

  const heartsContainer = engine.add([engine.pos(20, 20), engine.fixed(), tags.heartsContainer]);

  let previousX = 0;

  for (let i = 0; i < fullHearts; i++) {
    heartsContainer.add([engine.sprite(animationKeys.heart.fullHeart), engine.pos(previousX, 0)]);
    previousX += 48;
  }

  if (addHalfHeart) {
    heartsContainer.add([engine.sprite(animationKeys.heart.halfHeart), engine.pos(previousX, 0)]);
    previousX += 48;
  }

  for (let i = 0; i < emptyHearts; i++) {
    heartsContainer.add([engine.sprite(animationKeys.heart.emptyHeart), engine.pos(previousX, 0)]);
    previousX += 48;
  }

  return heartsContainer;
};
