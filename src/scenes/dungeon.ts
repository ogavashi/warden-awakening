import { LAYERS, LAYER_OBJECTS, SCENE_KEYS, config, tags } from "@common";
import { messages } from "@content";
import {
  addPressButtonAI,
  generateBox,
  generatePlayer,
  generatePressButton,
  setPlayerInstance,
} from "@entities";
import { audioState, gameState } from "@state";
import { DungeonEntities, PlayerInstance, PressButtonInstance, PrevScene } from "@types";
import { coinsBar, healthBar, toast } from "@ui";
import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
  slideCamX,
  slideCamY,
  slideXMove,
  slideYMove,
} from "@utils";
import { KaboomCtx } from "kaboom";

const dungeon = async (engine: KaboomCtx) => {
  audioState.stopAll();
  colorizeBackground(engine, 27, 29, 52);

  const mapData = await fetchMapData(config.dungeonMapPath);
  const map = engine.add([engine.pos(420, 95)]);

  const entities: DungeonEntities = {
    player: null,
    ghost: null,
    pressButtons: [],
    boxes: [],
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

        //Add buttons
        if (object.name === LAYER_OBJECTS.pressButton) {
          entities.pressButtons.push(
            map.add(generatePressButton(engine, engine.vec2(object.x, object.y)))
          );

          continue;
        }

        //Add boxes
        if (object.name === LAYER_OBJECTS.box) {
          entities.boxes.push(map.add(generateBox(engine, engine.vec2(object.x, object.y))));

          continue;
        }

        //Add ghost here

        //Add prision door
      }

      continue;
    }

    drawTiles(engine, map, layer, tileheight, tilewidth);
  }

  if (!entities.player) {
    return;
  }
  engine.camScale(engine.vec2(4));

  setPlayerInstance(engine, entities.player as PlayerInstance);

  if (!entities.pressButtons.length) {
    return;
  }

  for (const pressButton of entities.pressButtons) {
    addPressButtonAI(engine, pressButton as PressButtonInstance);
  }

  entities.player.onCollide(tags.doorExit, () => {
    gameState.setPrevScene(SCENE_KEYS.dungeon as PrevScene);
    engine.go(SCENE_KEYS.world);
  });

  entities.player.onCollide(tags.bossEnterance, async () => {
    if (!gameState.getIsPuzzleSolved()) {
      await toast(engine, messages[gameState.getLocale()].closedDoor);
      return;
    }
    slideYMove(entities.player as PlayerInstance, slideCamY(engine, -180, 1), -50);
  });

  entities.player.onCollide(tags.bossExit, async () => {
    slideYMove(entities.player as PlayerInstance, slideCamY(engine, 180, 1), 50);
  });

  entities.player.onCollide(tags.puzzleEnterance, async () => {
    slideXMove(entities.player as PlayerInstance, slideCamX(engine, 325, 1), 40);
  });

  entities.player.onCollide(tags.puzzleExit, async () => {
    slideXMove(entities.player as PlayerInstance, slideCamX(engine, -325, 1), -40);
  });

  healthBar(engine);
  coinsBar(engine);
};

export default dungeon;
