import { LAYERS, LAYER_OBJECTS, config } from "@common";
import { generatePlayer, generateSlime } from "@entities";
import { Entities } from "@types";
import { colorizeBackground, drawTiles, fetchMapData } from "@utils";
import { KaboomCtx } from "kaboom";

const world = async (engine: KaboomCtx) => {
  colorizeBackground(engine, 76, 170, 255);
  const mapData = await fetchMapData(config.worldMapPath);

  const map = engine.add([engine.pos(0, 0)]);

  const entities: Entities = {
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
      for (const object of layer.objects ?? []) {
        if (object.name === LAYER_OBJECTS.player) {
          entities.player = map.add(generatePlayer(engine, engine.vec2(object.x, object.y)));

          continue;
        }

        if (object.name === LAYER_OBJECTS.slime) {
          entities.player = map.add(generateSlime(engine, engine.vec2(object.x, object.y)));

          continue;
        }
      }

      continue;
    }

    drawTiles(engine, map, layer, tileheight, tilewidth);
  }

  engine.camScale(engine.vec2(4));
  engine.camPos(entities.player?.worldPos() ?? engine.vec2());
};

export default world;
