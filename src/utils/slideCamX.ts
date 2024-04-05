import { KaboomCtx } from "kaboom";

export const slideCamX = async (engine: KaboomCtx, range: number, duration: number) => {
  const currentCamPos = engine.camPos();
  await engine.tween(
    currentCamPos.x,
    currentCamPos.x + range,
    duration,
    (newPosX) => engine.camPos(newPosX, currentCamPos.y),
    engine.easings.linear
  );
};
