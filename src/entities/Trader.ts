import { animationKeys, config, tags } from "@common";
import { traderLines } from "@content";
import { gameState, traderState } from "@state";
import { Directions, PlayerInstance, TraderInstance } from "@types";
import { dialog, trade } from "@ui";
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

export const startTraderInteraction = async (
  engine: KaboomCtx,
  trader: TraderInstance,
  player: PlayerInstance
) => {
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

  const responses = traderLines[gameState.getLocale()];

  let nbOfTalks = traderState.getTalkedNum();

  if (nbOfTalks > responses.length - 1) {
    traderState.setTalkedNum(1);
    nbOfTalks = traderState.getTalkedNum();
  }

  let response = responses[nbOfTalks];

  if (responses[nbOfTalks]) {
    if (nbOfTalks) {
      await trade(engine);
    }

    await dialog(engine, engine.vec2(200, 500), response);

    traderState.setTalkedNum(nbOfTalks + 1);
  }
};
