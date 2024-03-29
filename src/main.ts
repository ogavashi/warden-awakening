import "./style.css";

import engine from "./kaboomContext";

import scenes from "@scenes";
import { config } from "@common";
import { loadSounds } from "@utils";

const DEFAULT_SCENE = "world";

engine.loadSprite(config.assetsName, config.assetsPath, config.assetsOptions);
loadSounds(engine);

for (const sceneName in scenes) {
  if (Object.hasOwnProperty.call(scenes, sceneName)) {
    engine.scene(sceneName, () => scenes[sceneName](engine));
  }
}

engine.go(DEFAULT_SCENE);
