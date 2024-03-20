import { config } from "@common";
import { Layer } from "@types";
import { GameObj, KaboomCtx, PosComp } from "kaboom";

export const drawTiles = (
  engine: KaboomCtx,
  map: GameObj<PosComp>,
  layer: Layer,
  height: number,
  width: number
) => {
  let numberOfDrawn = 0;
  const tilePos = engine.vec2(0, 0);

  if (!layer.data) {
    return;
  }

  for (const tile of layer.data) {
    if (numberOfDrawn % layer.width! === 0) {
      tilePos.x = 0;
      tilePos.y += height;
    } else {
      tilePos.x += width;
    }

    numberOfDrawn++;
    if (tile === 0) continue;

    map.add([
      engine.sprite(config.assetsName, { frame: tile - 1 }),
      engine.pos(tilePos),
      engine.offscreen(),
    ]);
  }
};
