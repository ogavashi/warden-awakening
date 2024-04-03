import { GameEntity } from "@types";
import { KaboomCtx } from "kaboom";

export const defeatEffect = async (engine: KaboomCtx, entity: GameEntity) => {
  const duration = 0.5;
  const steps = 10;

  const stepSize = 1 / steps;
  const timeStep = duration / steps;

  for (let i = 0; i < steps; i++) {
    await engine.wait(timeStep);
    entity.opacity -= stepSize;
  }
};
