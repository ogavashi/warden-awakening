import { LAYERS, LAYER_OBJECTS, SCENE_KEYS, animationKeys, config, sounds, tags } from "@common";
import {
  generatePlayer,
  generateTrader,
  setPlayerInstance,
  startTraderInteraction,
} from "@entities";
import { audioState } from "@state";
import { GameObject, PlayerInstance, ShopEntities, TraderInstance } from "@types";
import { healthBar } from "@ui";
import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
  playAnimIfNotPlaying,
} from "@utils";
import { KaboomCtx } from "kaboom";

const shop = async (engine: KaboomCtx) => {
  audioState.stopAll();
  colorizeBackground(engine, 27, 29, 52);

  const mapData = await fetchMapData(config.shopMapPath);
  const map = engine.add([engine.pos(510, 260)]);
  const backgroundMusic = audioState.playSound(engine, sounds.shop.background.name, {
    loop: true,
    volume: config.musicVolume,
  });

  const entities: ShopEntities = {
    player: null,
    trader: null,
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

        if (object.name === LAYER_OBJECTS.trader) {
          entities.trader = map.add(generateTrader(engine, engine.vec2(object.x, object.y)));

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

  entities.player.onCollide(tags.trader, (trader) => {
    startTraderInteraction(trader as TraderInstance, entities.player as PlayerInstance);
  });

  entities.player.onCollideEnd(tags.trader, (trader) => {
    playAnimIfNotPlaying(trader as GameObject, animationKeys.trader.down);
  });

  healthBar(engine);
};

export default shop;
