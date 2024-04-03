import { GameEntity } from "@types";
import { KaboomCtx } from "kaboom";

export const blinkEffect = async (engine: KaboomCtx, entity: GameEntity) => {
  await engine.tween(
    entity.opacity,
    0,
    0.1,
    (val) => (entity.opacity = val),
    engine.easings.linear
  );
  await engine.tween(
    entity.opacity,
    1,
    0.1,
    (val) => (entity.opacity = val),
    engine.easings.linear
  );
};
