import { Layer } from "@types";
import { GameObj, KaboomCtx, PosComp, Vec2 } from "kaboom";

const generateColliderBox = (
  engine: KaboomCtx,
  width: number,
  height: number,
  pos: Vec2,
  tag: string
) => {
  return [
    engine.area({ shape: new engine.Rect(engine.vec2(0), width, height) }),
    engine.pos(pos),
    engine.body({ isStatic: true }),
    engine.offscreen(),
    tag,
  ];
};

export const drawBoundaries = (engine: KaboomCtx, map: GameObj<PosComp>, layer: Layer) => {
  for (const object of layer.objects ?? []) {
    map.add(
      generateColliderBox(
        engine,
        object.width,
        object.height,
        engine.vec2(object.x, object.y + 16),
        object.name
      )
    );
  }
};
