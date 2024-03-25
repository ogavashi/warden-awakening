import { animationKeys, config, tags } from "@common";
import { Directions, PlayerInstance } from "@types";
import { multiKeysDown, playAnimIfNotPlaying } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

export const generatePlayer = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.player.idle.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(3, 4), 10, 12) }),
    engine.body(),
    engine.pos(pos),
    engine.opacity(),
    {
      speed: 70,
      attackPower: 1,
      direction: Directions.DOWN,
      isAttacking: false,
    },
    tags.player,
  ];
};

export const setPlayerInstance = (engine: KaboomCtx, player: PlayerInstance) => {
  engine.onKeyDown((key) => {
    if (["left", "a"].includes(key) && !multiKeysDown(engine, ["up", "down", "w", "s"])) {
      player.flipX = true;
      playAnimIfNotPlaying(player, animationKeys.player.side);
      player.move(-player.speed, 0);
      player.direction = Directions.LEFT;

      return;
    }

    if (["right", "d"].includes(key) && !multiKeysDown(engine, ["up", "down", "w", "s"])) {
      player.flipX = false;
      playAnimIfNotPlaying(player, animationKeys.player.side);
      player.move(player.speed, 0);
      player.direction = Directions.RIGHT;

      return;
    }

    if (["up", "w"].includes(key)) {
      playAnimIfNotPlaying(player, animationKeys.player.up);
      player.move(0, -player.speed);
      player.direction = Directions.UP;

      return;
    }

    if (["down", "s"].includes(key)) {
      playAnimIfNotPlaying(player, animationKeys.player.down);
      player.move(0, player.speed);
      player.direction = Directions.DOWN;

      return;
    }
  });

  engine.onKeyRelease(() => {
    player.stop();
  });
};
