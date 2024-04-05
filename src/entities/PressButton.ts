import { config, sounds, tags } from "@common";
import { audioState } from "@state";
import { BoxInstance, PressButtonInstance } from "@types";
import { checkPuzzle } from "@utils";
import { KaboomCtx, Vec2 } from "kaboom";

export const generatePressButton = (engine: KaboomCtx, pos: Vec2) => {
  const pressButton = [
    engine.sprite(config.assetsName, { frame: 499 }),
    engine.area({ shape: new engine.Rect(engine.vec2(6, 6), 5, 2) }),
    engine.pos(pos),
    engine.opacity(),
    {
      isButton: true,
    },
    tags.pressButton,
  ];

  return pressButton;
};

export const addPressButtonAI = (engine: KaboomCtx, pressButton: PressButtonInstance) => {
  pressButton.onCollide(tags.player, () => {
    audioState.playSound(engine, sounds.game.button.press.name, {
      volume: config.musicVolume,
    });
    pressButton.use(engine.sprite(config.assetsName, { frame: 500 }));
  });

  pressButton.onCollide(tags.box, (box) => {
    const boxInstance = box as BoxInstance;
    audioState.playSound(engine, sounds.game.button.press.name, {
      volume: config.musicVolume,
    });
    boxInstance.isPlaced = true;
    pressButton.use(engine.sprite(config.assetsName, { frame: 500 }));
    checkPuzzle(engine);
  });

  pressButton.onCollideEnd(tags.player, () => {
    audioState.playSound(engine, sounds.game.button.press.name, {
      volume: config.musicVolume,
      detune: -400,
    });
    pressButton.use(engine.sprite(config.assetsName, { frame: 499 }));
  });

  pressButton.onCollideEnd(tags.box, (box) => {
    const boxInstance = box as BoxInstance;
    audioState.playSound(engine, sounds.game.button.press.name, {
      volume: config.musicVolume,
      detune: -400,
    });
    const collidedButtons = boxInstance
      .getCollisions()
      .filter(({ target }) => target.isButton).length;

    boxInstance.isPlaced = collidedButtons >= 1;
    pressButton.use(engine.sprite(config.assetsName, { frame: 499 }));
    checkPuzzle(engine);
  });
};
