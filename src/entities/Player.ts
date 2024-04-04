import { SCENE_KEYS, animationKeys, config, sounds, tags } from "@common";
import { gameState, playerState } from "@state";
import { Directions, PlayerInstance } from "@types";
import { healthBar } from "@ui";
import { blinkEffect, multiKeysDown, playAnimIfNotPlaying } from "@utils";
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
      hasCooldown: false,
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
    if (gameState.getFreezePlayer() || player.isAttacking) {
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

  engine.onKeyPress((key) => {
    if (
      key !== "space" ||
      gameState.getFreezePlayer() ||
      !playerState.getHasSword() ||
      player.hasCooldown
    )
      return;

    const swordSound = engine.play(sounds.player.sword.attack.name, {
      volume: config.effectsVolums,
    });

    player.isAttacking = true;
    player.hasCooldown = true;

    if (!engine.get(tags.swordHitBox).length) {
      const swordHitBoxPosX = {
        left: player.worldPos().x - 2,
        right: player.worldPos().x + 10,
        up: player.worldPos().x + 5,
        down: player.worldPos().x + 2,
      };

      const swordHitBoxPosY = {
        left: player.worldPos().y + 5,
        right: player.worldPos().y + 5,
        up: player.worldPos().y,
        down: player.worldPos().y + 10,
      };

      engine.add([
        engine.area({ shape: new engine.Rect(engine.vec2(0), 8, 8) }),
        engine.pos(swordHitBoxPosX[player.direction], swordHitBoxPosY[player.direction]),
        tags.swordHitBox,
      ]);

      engine.wait(0.5, () => {
        player.hasCooldown = false;
        swordSound.stop();
      });

      engine.wait(0.2, () => {
        engine.destroyAll(tags.swordHitBox);
        if (player.direction === Directions.LEFT || player.direction === Directions.RIGHT) {
          playAnimIfNotPlaying(player, animationKeys.player.side);
          player.stop();

          return;
        }
        playAnimIfNotPlaying(player, animationKeys.player[player.direction]);
        player.stop();
      });
    }
    playAnimIfNotPlaying(player, animationKeys.player.attack[player.direction]);
  });

  engine.onKeyRelease(() => {
    player.isAttacking = false;
    player.stop();
  });

  player.onCollide(tags.enemy, async (enemy) => {
    if (player.isAttacking) return;
    playerState.setHealth(playerState.getHealth() - enemy.attackPower);
    engine.destroyAll(tags.heartsContainer);
    healthBar(engine);
    await blinkEffect(engine, player);
    if (playerState.getHealth() <= 0) {
      engine.go(SCENE_KEYS.house);
      playerState.setHealth(playerState.getMaxHealth());
    }
  });
};
