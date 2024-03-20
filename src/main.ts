import "./style.css";

import scenes from "@scenes";
import { config } from "@common";
import engine from "./kaboomContext";

const DEFAULT_SCENE = "world";

engine.loadSprite(config.assetsName, config.assetsPath, {
  sliceX: config.sliceX,
  sliceY: config.sliceY,
});

for (const sceneName in scenes) {
  if (Object.hasOwnProperty.call(scenes, sceneName)) {
    engine.scene(sceneName, () => scenes[sceneName](engine));
  }
}

engine.go(DEFAULT_SCENE);
