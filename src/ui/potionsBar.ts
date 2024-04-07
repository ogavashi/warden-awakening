import { animationKeys, tags } from "@common";
import { playerState } from "@state";

import { KaboomCtx } from "kaboom";

export const potionsBar = (engine: KaboomCtx) => {
  const crimsonPotions = playerState.getCrimsonPotions();
  const emeraldPotions = playerState.getEmeraldPotions();

  const potionsContainer = engine.add([engine.pos(820, 25), engine.fixed(), tags.potionsContainer]);

  if (crimsonPotions) {
    potionsContainer.add([
      engine.sprite(animationKeys.potion.crimson),
      engine.scale(3),
      engine.pos(0, 0),
    ]);

    potionsContainer.add([
      engine.text(`:${crimsonPotions}`, {
        width: 750,
        lineSpacing: 2,
        letterSpacing: 2,
      }),
      engine.color(0, 0, 0),
      engine.pos(50, 10),
      engine.fixed(),
    ]);
  }

  if (emeraldPotions) {
    potionsContainer.add([
      engine.sprite(animationKeys.potion.emerald),
      engine.scale(3),
      engine.pos(130, 0),
    ]);

    potionsContainer.add([
      engine.text(`:${emeraldPotions}`, {
        width: 750,
        lineSpacing: 2,
        letterSpacing: 2,
      }),
      engine.color(0, 0, 0),
      engine.pos(180, 10),
      engine.fixed(),
    ]);
  }

  return potionsContainer;
};
