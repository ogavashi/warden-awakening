import { INTSANCE_STATES, animationKeys, config, tags } from "@common";
import { SlimeInstance } from "@types";
import { playAnimIfNotPlaying, setInstanceMovement } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

const DIRECTIONAL_STATES = [
  INTSANCE_STATES.left,
  INTSANCE_STATES.right,
  INTSANCE_STATES.up,
  INTSANCE_STATES.down,
];

export const generateSlime = (engine: KaboomCtx, pos: Vec2) => {
  return [
    engine.sprite(config.assetsName, { anim: animationKeys.slime.idle.down }),
    engine.area({ shape: new engine.Rect(engine.vec2(0, 6), 16, 10) }),
    engine.body(),
    engine.pos(pos),
    engine.offscreen(),
    engine.opacity(),
    engine.state(INTSANCE_STATES.idle, [INTSANCE_STATES.idle, ...DIRECTIONAL_STATES]),
    {
      speed: 50,
      attackPower: 0.5,
    },
    tags.slime,
  ];
};

export const setSlimeAI = (engine: KaboomCtx, slime: SlimeInstance) => {
  engine.onUpdate(() => setInstanceMovement(slime));

  const idle = slime.onStateEnter(INTSANCE_STATES.idle, async () => {
    slime.stop();

    await engine.wait(3);

    // Get random direction for next movement
    slime.enterState(DIRECTIONAL_STATES[Math.floor(Math.random() * DIRECTIONAL_STATES.length)]);
  });
  const left = slime.onStateEnter(INTSANCE_STATES.left, async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, animationKeys.slime.side);

    await engine.wait(3);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const right = slime.onStateEnter(INTSANCE_STATES.right, async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, animationKeys.slime.side);

    await engine.wait(3);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const up = slime.onStateEnter(INTSANCE_STATES.up, async () => {
    playAnimIfNotPlaying(slime, animationKeys.slime.up);

    await engine.wait(3);

    slime.enterState(INTSANCE_STATES.idle);
  });
  const down = slime.onStateEnter(INTSANCE_STATES.down, async () => {
    playAnimIfNotPlaying(slime, animationKeys.slime.down);

    await engine.wait(3);

    slime.enterState(INTSANCE_STATES.idle);
  });

  engine.onSceneLeave(() => {
    [idle, left, right, up, down].forEach((state) => state.cancel());
  });
};
