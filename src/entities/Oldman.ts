import { animationKeys, config, sounds, tags } from "@common";
import { messages, oldmanLines } from "@content";
import { gameState, oldmanState, playerState } from "@state";
import { Directions, OldmanInstance, PlayerInstance } from "@types";
import { dialog, toast } from "@ui";
import { playAnimIfNotPlaying } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

export const generateOldman = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.oldman.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(2, 4), 12, 12) }),
    engine.body({ isStatic: true }),
    engine.pos(pos),
    engine.opacity(),
    tags.oldman,
  ];
};

export const startInteraction = async (
  engine: KaboomCtx,
  oldman: OldmanInstance,
  player: PlayerInstance
) => {
  if (player.direction === Directions.LEFT) {
    oldman.flipX = true;
    playAnimIfNotPlaying(oldman, animationKeys.oldman.side);
  }
  if (player.direction === Directions.RIGHT) {
    oldman.flipX = false;
    playAnimIfNotPlaying(oldman, animationKeys.oldman.side);
  }
  if (player.direction === Directions.DOWN) {
    playAnimIfNotPlaying(oldman, animationKeys.oldman.up);
  }

  const responses = oldmanLines[gameState.getLocale()];

  let nbOfTalks = oldmanState.getTalkedNum();

  if (nbOfTalks > responses.length - 2) {
    oldmanState.setTalkedNum(1);
    nbOfTalks = oldmanState.getTalkedNum();
  }

  let response = responses[nbOfTalks];

  if (gameState.getIsSonSaved()) {
    await dialog(engine, engine.vec2(200, 500), responses[responses.length - 1]);
  }

  if (responses[nbOfTalks]) {
    await dialog(engine, engine.vec2(200, 500), response);

    //Give sword after first talk
    if (!nbOfTalks) {
      playerState.setHasSword(true);
      engine.play(sounds.game.item.pickUp.name, {
        volume: config.effectsVolums,
      });
      await toast(engine, messages[gameState.getLocale()].getSword);
    }

    oldmanState.setTalkedNum(nbOfTalks + 1);
  }
};
