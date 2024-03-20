import scenes from "@scenes";
import engine from "./kaboomContext";

import "./style.css";

const DEFAULT_SCENE = "world";

for (const sceneName in scenes) {
  if (Object.hasOwnProperty.call(scenes, sceneName)) {
    engine.scene(sceneName, () => scenes[sceneName](engine));
  }
}

engine.go(DEFAULT_SCENE);
