import { animationKeys, config, tags } from "@common";
import { gameState } from "@state";
import { Directions, PlayerInstance } from "@types";
import { multiKeysDown, playAnimIfNotPlaying } from "@utils";
import { KaboomCtx, Key, Vec2 } from "kaboom";

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

const movePlayer = (
  engine: KaboomCtx,
  player: PlayerInstance,
  currentKey: Key,
  expectedKey: Key,
  excludedKeys: Key[],
  direction: Directions,
  moveVec: Vec2
) => {
  if (currentKey === expectedKey && !multiKeysDown(engine, excludedKeys)) {
    switch (direction) {
      case Directions.LEFT:
        player.flipX = true;
        playAnimIfNotPlaying(player, animationKeys.player.side);
        break;
      case Directions.RIGHT:
        player.flipX = false;
        playAnimIfNotPlaying(player, animationKeys.player.side);
        break;
      case Directions.UP:
        playAnimIfNotPlaying(player, animationKeys.player.up);
        break;
      case Directions.DOWN:
        playAnimIfNotPlaying(player, animationKeys.player.down);
        break;
      default:
        break;
    }

    player.move(moveVec);
    player.direction = direction;
  }
};

export const setPlayerInstance = (engine: KaboomCtx, player: PlayerInstance) => {
  engine.onKeyDown((key) => {
    if (gameState.getFreezePlayer()) {
      return;
    }
    //Left movement
    movePlayer(
      engine,
      player,
      key,
      "left",
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "ф" as Key, "a"],
      Directions.LEFT,
      engine.vec2(-player.speed, 0)
    );

    movePlayer(
      engine,
      player,
      key,
      "a",
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "left"],
      Directions.LEFT,
      engine.vec2(-player.speed, 0)
    );

    movePlayer(
      engine,
      player,
      key,
      "ф" as Key,
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "left"],
      Directions.LEFT,
      engine.vec2(-player.speed, 0)
    );

    //Right movement
    movePlayer(
      engine,
      player,
      key,
      "d",
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "right"],
      Directions.RIGHT,
      engine.vec2(player.speed, 0)
    );

    movePlayer(
      engine,
      player,
      key,
      "в" as Key,
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "right"],
      Directions.RIGHT,
      engine.vec2(player.speed, 0)
    );

    movePlayer(
      engine,
      player,
      key,
      "right",
      ["up", "down", "w", "s", "ц" as Key, "і" as Key, "в" as Key, "d"],
      Directions.RIGHT,
      engine.vec2(player.speed, 0)
    );

    //Up movement
    movePlayer(
      engine,
      player,
      key,
      "up",
      ["w", "ц" as Key],
      Directions.UP,
      engine.vec2(0, -player.speed)
    );

    movePlayer(
      engine,
      player,
      key,
      "ц" as Key,
      ["up"],
      Directions.UP,
      engine.vec2(0, -player.speed)
    );

    movePlayer(
      engine,
      player,
      key,
      "w" as Key,
      ["up"],
      Directions.UP,
      engine.vec2(0, -player.speed)
    );

    //Down movement
    movePlayer(
      engine,
      player,
      key,
      "down",
      ["s", "і" as Key],
      Directions.DOWN,
      engine.vec2(0, player.speed)
    );

    movePlayer(
      engine,
      player,
      key,
      "і" as Key,
      ["down"],
      Directions.DOWN,
      engine.vec2(0, player.speed)
    );

    movePlayer(
      engine,
      player,
      key,
      "s" as Key,
      ["down"],
      Directions.DOWN,
      engine.vec2(0, player.speed)
    );
  });

  engine.onKeyRelease(() => {
    player.stop();
  });
};
