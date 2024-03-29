import { animationKeys, config, tags } from "@common";
import { oldmanLines } from "@content";
import { Directions, OldmanInstance, PlayerInstance } from "@types";
import { dialog } from "@ui";
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

  const responses = oldmanLines.english;

  dialog(engine, engine.vec2(200, 500), responses[0]);
};
