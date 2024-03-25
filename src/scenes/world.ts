import { LAYERS, LAYER_OBJECTS, config } from "@common";
import { generatePlayer, generateSlime, setPlayerInstance } from "@entities";
import { Entities, PlayerInstance } from "@types";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "@utils";
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
      drawBoundaries(engine, map, layer);

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

  if (!entities.player) {
    return;
  }

  engine.camScale(engine.vec2(4));
  engine.camPos(entities.player.worldPos());
  engine.onUpdate(async () => {
    if (entities.player?.pos.dist(engine.camPos())) {
      await engine.tween(
        engine.camPos(),
        entities.player.worldPos(),
        0.15,
        (newPos) => {
          engine.camPos(newPos);
        },
        engine.easings.linear
      );
    }
  });

  setPlayerInstance(engine, entities.player as PlayerInstance);
};

export default world;
