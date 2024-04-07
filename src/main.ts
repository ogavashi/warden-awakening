import "./style.css";

import engine from "./kaboomContext";

import scenes from "@scenes";
import { SCENE_KEYS, config, spriteAtlas } from "@common";
import { loadSounds } from "@utils";

const DEFAULT_SCENE = SCENE_KEYS.menu;

engine.loadSprite(config.assetsName, config.assetsPath, config.assetsOptions);
engine.loadSpriteAtlas(config.assetsPath, spriteAtlas);
loadSounds(engine);

for (const sceneName in scenes) {
  if (Object.hasOwnProperty.call(scenes, sceneName)) {
    engine.scene(sceneName, () => scenes[sceneName](engine));
  }
}

engine.go(SCENE_KEYS.dungeon);
