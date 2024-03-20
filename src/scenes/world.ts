import { LAYERS, config } from "@common";
import { colorizeBackground, drawTiles, fetchMapData } from "@utils";
import { KaboomCtx } from "kaboom";

const world = async (engine: KaboomCtx) => {
  colorizeBackground(engine, 76, 170, 255);
  const mapData = await fetchMapData(config.worldMapPath);

  const map = engine.add([engine.pos(0, 0)]);

  const entities = {
    player: null,
    slimes: [],
  };

  const { layers, tilewidth, tileheight } = mapData;

  for (const layer of layers) {
    if (layer.name === LAYERS.boundaries) {
      console.log("121212");
      continue;
    }

    if (layer.name === LAYERS.spawnPoints) {
      continue;
    }

    drawTiles(engine, map, layer, tileheight, tilewidth);
  }
};

export default world;
