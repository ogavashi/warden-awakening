import { LAYERS, LAYER_OBJECTS, SCENE_KEYS, config, sounds, tags } from "@common";
import {
  generatePlayer,
  generateSlime,
  setPlayerInstance,
  setSlimeAI,
  setSlimeImpact,
} from "@entities";
import { audioState, gameState } from "@state";
import { PlayerInstance, SlimeInstance, WorldEntities } from "@types";
import { coinsBar, healthBar } from "@ui";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "@utils";
import { KaboomCtx } from "kaboom";

const world = async (engine: KaboomCtx) => {
  audioState.stopAll();
  colorizeBackground(engine, 76, 170, 255);
  const mapData = await fetchMapData(config.worldMapPath);

  const map = engine.add([engine.pos(0, 0)]);

  const backgroundMusic = audioState.playSound(engine, sounds.world.background.name, {
    loop: true,
    volume: config.musicVolume,
  });

  const entities: WorldEntities = {
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
        if (
          object.name === LAYER_OBJECTS.playerDungeon &&
          gameState.getPrevScene() === SCENE_KEYS.dungeon
        ) {
          entities.player = map.add(generatePlayer(engine, engine.vec2(object.x, object.y)));

          continue;
        }

        if (
          object.name === LAYER_OBJECTS.playerShop &&
          gameState.getPrevScene() === SCENE_KEYS.shop
        ) {
          entities.player = map.add(generatePlayer(engine, engine.vec2(object.x, object.y)));

          continue;
        }

        if (
          object.name === LAYER_OBJECTS.player &&
          (!gameState.getPrevScene() || gameState.getPrevScene() === SCENE_KEYS.house)
        ) {
          entities.player = map.add(generatePlayer(engine, engine.vec2(object.x, object.y)));

          continue;
        }

        if (object.name === LAYER_OBJECTS.slime) {
          entities.slimes.push(map.add(generateSlime(engine, engine.vec2(object.x, object.y))));

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

  if (!entities.slimes.length) {
    return;
  }

  for (const slime of entities.slimes) {
    setSlimeAI(engine, slime as SlimeInstance);
    setSlimeImpact(engine, slime as SlimeInstance);
  }

  entities.player.onCollide(tags.doorEntrance, () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.house);
  });

  entities.player.onCollide(tags.shopEntrance, () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.shop);
  });

  entities.player.onCollide(tags.dungeonEnterance, () => {
    backgroundMusic.stop();
    engine.go(SCENE_KEYS.dungeon);
  });

  healthBar(engine);
  coinsBar(engine);
};

export default world;
