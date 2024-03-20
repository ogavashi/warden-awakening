import { KaboomCtx } from "kaboom";

const world = async (engine: KaboomCtx) => {
  engine.add([engine.rect(100, 100), engine.pos(engine.center())]);
};

export default world;
