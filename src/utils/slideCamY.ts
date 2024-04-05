import { KaboomCtx } from "kaboom";

export const slideCamY = async (engine: KaboomCtx, range: number, duration: number) => {
  const currentCamPos = engine.camPos();
  await engine.tween(
    currentCamPos.y,
    currentCamPos.y + range,
    duration,
    (newPosY) => engine.camPos(currentCamPos.x, newPosY),
    engine.easings.linear
  );
};
