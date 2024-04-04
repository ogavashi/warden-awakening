import { LAYERS, LAYER_OBJECTS, SCENE_KEYS, animationKeys, config, sounds, tags } from "@common";
import { generateOldman, generatePlayer, setPlayerInstance, startInteraction } from "@entities";
import { audioState } from "@state";
import { GameObject, HouseEntities, OldmanInstance, PlayerInstance } from "@types";
import { healthBar } from "@ui";
import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
  playAnimIfNotPlaying,
} from "@utils";
import { KaboomCtx } from "kaboom";

const house = async (engine: KaboomCtx) => {
  audioState.stopAll();
  colorizeBackground(engine, 27, 29, 52);

  const mapData = await fetchMapData(config.houseMapPath);
  const map = engine.add([engine.pos(480, 200)]);
  const backgroundMusic = audioState.playSound(engine, sounds.house.background.name, {
    loop: true,
    volume: config.musicVolume,
  });

  const entities: HouseEntities = {
    player: null,
    oldMan: null,
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

        if (object.name === LAYER_OBJECTS.oldman) {
          entities.oldMan = map.add(generateOldman(engine, engine.vec2(object.x, object.y)));

          continue;
        }
      }

      continue;
    }

    drawTiles(engine, map, layer, tileheight, tilewidth);
  }

  engine.camScale(engine.vec2(4));

  setPlayerInstance(engine, entities.player as PlayerInstance);

  if (!entities.player) {
    return;
  }

  entities.player.onCollide(tags.doorExit, () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.world);
  });

  entities.player.onCollide(tags.oldman, (oldman) => {
    startInteraction(engine, oldman as OldmanInstance, entities.player as PlayerInstance);
  });

  entities.player.onCollideEnd(tags.oldman, (oldman) => {
    playAnimIfNotPlaying(oldman as GameObject, animationKeys.oldman.down);
  });

  healthBar(engine);
};

export default house;
