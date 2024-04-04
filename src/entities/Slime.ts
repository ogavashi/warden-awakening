import { INTSANCE_STATES, animationKeys, config, sounds, tags } from "@common";
import { CoinInstance, PlayerInstance, SlimeInstance } from "@types";
import { blinkEffect, defeatEffect, playAnimIfNotPlaying, setInstanceMovement } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";
import { addCoinAI, generateCoin } from "./Coin";

const DIRECTIONAL_STATES = [
  INTSANCE_STATES.left,
  INTSANCE_STATES.right,
  INTSANCE_STATES.up,
  INTSANCE_STATES.down,
];

const DEFAULT_VALUES = {
  speed: 20,
  waitTime: 3,
  actionTime: 5,
  framesCounter: 60,
  attackPower: 0.5,
};

export const generateSlime = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.slime.idle.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(0, 6), 16, 10) }),
    engine.body(),
    engine.pos(pos),
    engine.offscreen(),
    engine.opacity(),
    engine.state(INTSANCE_STATES.idle, [INTSANCE_STATES.idle, ...DIRECTIONAL_STATES]),
    engine.health(3),
    {
      speed: DEFAULT_VALUES.speed,
      waitTime: DEFAULT_VALUES.waitTime,
      actionTime: DEFAULT_VALUES.actionTime,
      attackPower: DEFAULT_VALUES.attackPower,
      prevX: pos.x,
      prevY: pos.y,
      counter: 0,
      framesCounter: DEFAULT_VALUES.framesCounter,
    },
    tags.slime,
    tags.enemy,
  ];
};

export const setSlimeAI = (engine: KaboomCtx, slime: SlimeInstance) => {
  engine.onUpdate(() => {
    const { x, y } = slime.worldPos();
    if (
      slime.state !== INTSANCE_STATES.idle &&
      slime.prevX === x &&
      slime.prevY === y &&
      slime.counter > slime.framesCounter
    ) {
      slime.enterState(DIRECTIONAL_STATES[Math.floor(Math.random() * DIRECTIONAL_STATES.length)]);
      slime.counter = 0;
    }
    slime.prevX = x;
    slime.prevY = y;
    slime.counter++;

    setInstanceMovement(slime);
  });

  const idle = slime.onStateEnter(INTSANCE_STATES.idle, async () => {
    slime.stop();

    await engine.wait(slime.waitTime);

    // Get random direction for next movement
    slime.enterState(DIRECTIONAL_STATES[Math.floor(Math.random() * DIRECTIONAL_STATES.length)]);
  });
  const left = slime.onStateEnter(INTSANCE_STATES.left, async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, animationKeys.slime.side);

    await engine.wait(slime.actionTime);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const right = slime.onStateEnter(INTSANCE_STATES.right, async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, animationKeys.slime.side);

    await engine.wait(slime.actionTime);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const up = slime.onStateEnter(INTSANCE_STATES.up, async () => {
    playAnimIfNotPlaying(slime, animationKeys.slime.up);

    await engine.wait(slime.actionTime);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const down = slime.onStateEnter(INTSANCE_STATES.down, async () => {
    playAnimIfNotPlaying(slime, animationKeys.slime.down);

    await engine.wait(slime.actionTime);

    slime.enterState(INTSANCE_STATES.idle);
  });

  engine.onSceneLeave(() => {
    [idle, left, right, up, down].forEach((state) => state.cancel());
  });
};

export const setSlimeImpact = (engine: KaboomCtx, slime: SlimeInstance) => {
  slime.onCollide(tags.swordHitBox, async () => {
    const [player] = engine.get(tags.player, { recursive: true }) as [PlayerInstance];

    slime.hurt(player.attackPower);
    blinkEffect(engine, slime);

    if (slime.hp() <= 0) {
      engine.play(sounds.slime.defeat.name, {
        volume: config.effectsVolums,
      });

      const coinPos = slime.worldPos();

      //destroy with animation
      slime.speed = 0;
      await defeatEffect(engine, slime);
      slime.destroy();

      //add coin
      const coin = engine.add(generateCoin(engine, coinPos));

      addCoinAI(engine, coin as CoinInstance);
    }

    slime.speed = 100;
    slime.actionTime = 5;
    slime.waitTime = 0.5;
    slime.framesCounter = 0;
    slime.attackPower = 1;

    engine.wait(10, () => {
      slime.speed = DEFAULT_VALUES.speed;
      slime.actionTime = DEFAULT_VALUES.actionTime;
      slime.waitTime = DEFAULT_VALUES.waitTime;
      slime.framesCounter = DEFAULT_VALUES.framesCounter;
      slime.attackPower = DEFAULT_VALUES.attackPower;
    });
  });
};
