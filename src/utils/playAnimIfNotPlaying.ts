import { GameObject } from "@types";

export const playAnimIfNotPlaying = (gameObj: GameObject, animKey: string) => {
  if (gameObj.curAnim() !== animKey) {
    gameObj.play(animKey);
  }
};
