import { SCENE_KEYS, config, sounds } from "@common";
import { menu } from "@content";
import { audioState, gameState } from "@state";
import { colorizeBackground } from "@utils";
import { KaboomCtx } from "kaboom";

const gameOver = async (engine: KaboomCtx) => {
  audioState.stopAll();

  const currentLocale = gameState.getLocale();

  colorizeBackground(engine, 0, 0, 0);

  const backgroundMusic = audioState.playSound(engine, sounds.game.gameOver.name, {
    loop: true,
    volume: config.musicVolume,
  });

  engine.add([
    engine.text(menu[currentLocale].gameOver, { size: 38 }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y - 100),
  ]);

  engine.add([
    engine.text(menu[currentLocale].unsuccess, {
      size: 24,
    }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y + 100),
  ]);

  engine.add([
    engine.text(menu[currentLocale].restart, {
      size: 28,
    }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y + 200),
  ]);

  engine.onKeyPress("enter", () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.house);
  });
};

export default gameOver;
