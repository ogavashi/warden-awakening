import { config } from "@common";
import { KaboomCtx } from "kaboom";

// TODO: Add types

export const drawTiles = (
  engine: KaboomCtx,
  map: any,
  layer: any,
  height: number,
  width: number
) => {
  let numberOfDrawn = 0;
  const tilePos = engine.vec2(0, 0);

  for (const tile of layer.data) {
    if (numberOfDrawn % layer.width === 0) {
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
