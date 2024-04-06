import { SCENE_KEYS, config, sounds } from "@common";
import { menu } from "@content";
import { audioState, gameState } from "@state";
import { Locale } from "@types";
import { colorizeBackground } from "@utils";
import { KaboomCtx } from "kaboom";

const mainMenu = async (engine: KaboomCtx) => {
  audioState.stopAll();

  const currentLocale = gameState.getLocale();

  colorizeBackground(engine, 0, 0, 0);

  const backgroundMusic = audioState.playSound(engine, sounds.menu.name, {
    loop: true,
    volume: config.musicVolume,
  });

  engine.add([
    engine.text(menu[currentLocale].title, { size: 38 }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y - 100),
  ]);

  engine.add([
    engine.text(menu[currentLocale].languageIndication, {
      size: 24,
    }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y + 100),
  ]);

  engine.add([
    engine.text(menu[currentLocale].playIndication, {
      size: 28,
    }),
    engine.area(),
    engine.anchor("center"),
    engine.pos(engine.center().x, engine.center().y + 200),
  ]);

  engine.onKeyPress((key) => {
    if (["f", "а"].includes(key)) {
      if (currentLocale === Locale.ENG) gameState.setLocale(Locale.UKR);
      if (currentLocale === Locale.UKR) gameState.setLocale(Locale.ENG);
      engine.go(SCENE_KEYS.menu);
    }
  });

  engine.onKeyPress("enter", () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.world);
  });
};

export default mainMenu;
