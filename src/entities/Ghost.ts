import { BOSS_STATES, animationKeys, config, frameAtlas, sounds, tags } from "@common";
import { audioState, playerState } from "@state";
import { GhostInstance, PlayerInstance } from "@types";
import { blinkEffect, defeatEffect } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

const GHOST_HEALTH = 10;
const ATTACK_SPEEDS = [0.5, 0.7, 1];

export const generateGhost = (engine: KaboomCtx, pos: Vec2) => {
  const ghost = [
    engine.sprite(config.assetsName, { anim: animationKeys.ghost.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(2, 4), 12, 12) }),
    engine.body(),
    engine.pos(pos),
    engine.health(GHOST_HEALTH),
    engine.opacity(),
    engine.state(BOSS_STATES.idle, [
      BOSS_STATES.idle,
      BOSS_STATES.right,
      BOSS_STATES.backtrack,
      BOSS_STATES.attack,
      BOSS_STATES.evade,
      BOSS_STATES.standby,
    ]),
    {
      isAttacking: false,
      attackPower: 1,
      prevPos: engine.vec2(0, 0),
      isWaiting: false,
      isDefeated: false,
    },
    tags.ghost,
    tags.enemy,
  ];

  return ghost;
};

export const setGhostAI = (engine: KaboomCtx, ghost: GhostInstance, player: PlayerInstance) => {
  let attackCount = 0;

  const updateRef = engine.onUpdate(() => {
    if (player.pos.dist(ghost.pos) < 30) {
      ghost.enterState(BOSS_STATES.backtrack);
      updateRef.cancel();

      return;
    }
  });

  engine.loop(5, () => {
    ghost.prevPos = ghost.pos;
  });

  const backtrack = ghost.onStateEnter(BOSS_STATES.backtrack, async () => {
    if (ghost.isWaiting || ghost.isDefeated) return;

    await engine.tween(
      ghost.pos.y,
      ghost.pos.y - 40,
      0.2,
      (val) => (ghost.pos.y = val),
      engine.easings.linear
    );

    ghost.enterState(BOSS_STATES.right);
  });

  const right = ghost.onStateEnter(BOSS_STATES.right, async () => {
    if (ghost.isWaiting || ghost.isDefeated) return;

    await engine.tween(
      ghost.pos.x,
      ghost.pos.x + 50,
      1,
      (val) => (ghost.pos.x = val),
      engine.easings.linear
    );

    ghost.enterState(BOSS_STATES.attack);
  });

  const attack = ghost.onStateEnter(BOSS_STATES.attack, async () => {
    if (ghost.isWaiting || ghost.isDefeated) return;

    ghost.isAttacking = true;
    audioState.playSound(engine, sounds.ghost.attack.name, {
      volume: config.effectsVolums,
    });
    const attackSpeeds = ATTACK_SPEEDS;

    await engine.tween(
      ghost.pos,
      player.pos,
      attackSpeeds[Math.floor(Math.random() * attackSpeeds.length)],
      (val) => (ghost.pos = val),
      engine.easings.linear
    );

    if (ghost.getCollisions().length > 0) {
      ghost.enterState(BOSS_STATES.evade);
      return;
    }
    attackCount++;
    if (attackCount >= 4) {
      ghost.enterState(BOSS_STATES.standby);
    }
    ghost.enterState(BOSS_STATES.attack);
  });

  const evade = ghost.onStateEnter(BOSS_STATES.evade, async () => {
    ghost.isAttacking = false;
    await engine.tween(
      ghost.pos,
      ghost.prevPos,
      0.8,
      (val) => (ghost.pos = val),
      engine.easings.linear
    );
    ghost.enterState(BOSS_STATES.attack);
  });

  const standby = ghost.onStateEnter(BOSS_STATES.standby, async () => {
    audioState.playSound(engine, sounds.ghost.standby.name, {
      volume: config.effectsVolums,
    });
    ghost.isAttacking = false;
    ghost.isWaiting = true;
    await engine.wait(3);
    ghost.isWaiting = false;
    ghost.enterState(BOSS_STATES.attack);
    attackCount = 0;
  });

  engine.onSceneLeave(() => {
    backtrack.cancel();
    right.cancel();
    attack.cancel();
    evade.cancel();
    updateRef.cancel();
    standby.cancel();
  });
};

export const setGhostImpact = (engine: KaboomCtx, ghost: GhostInstance) => {
  ghost.onCollide(tags.swordHitBox, async () => {
    if (ghost.isAttacking) {
      return;
    }

    const [player] = engine.get(tags.player, { recursive: true }) as [PlayerInstance];

    ghost.hurt(player.attackPower);
    blinkEffect(engine, ghost);

    if (ghost.hp() <= 0) {
      engine.play(sounds.slime.defeat.name, {
        volume: config.effectsVolums,
      });
      ghost.isDefeated = true;
      await defeatEffect(engine, ghost);
      ghost.destroy();
    }
  });
};

export const onGhostDestroy = (engine: KaboomCtx) => {
  engine.onDestroy(tags.ghost, () => {
    audioState.stopAll();
    audioState.playSound(engine, sounds.dungeon.background.name, {
      volume: config.effectsVolums,
      loop: true,
    });

    const prisonKey = engine.add([
      engine.sprite(config.assetsName, { frame: frameAtlas.key.cage }),
      engine.pos(engine.center().x + 4, engine.center().y - 200),
      engine.area(),
      tags.prisonKey,
    ]);

    prisonKey.onCollide(tags.player, () => {
      playerState.setHasCageKey(true);
      engine.destroy(prisonKey);
      audioState.playSound(engine, sounds.game.puzzleSolved.name, {
        volume: config.effectsVolums,
      });
    });
  });
};
