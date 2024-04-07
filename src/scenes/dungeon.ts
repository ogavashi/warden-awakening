import { LAYERS, LAYER_OBJECTS, SCENE_KEYS, config, frameAtlas, sounds, tags } from "@common";
import { messages, sonLines } from "@content";
import {
  addPressButtonAI,
  generateBox,
  generateGhost,
  generatePlayer,
  generatePressButton,
  onGhostDestroy,
  setGhostAI,
  setGhostImpact,
  setPlayerInstance,
} from "@entities";
import { audioState, gameState, playerState } from "@state";
import {
  DungeonEntities,
  GhostInstance,
  PlayerInstance,
  PressButtonInstance,
  PrevScene,
} from "@types";
import { coinsBar, dialog, healthBar, potionsBar, toast } from "@ui";
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

  const backgroundMusic = audioState.playSound(engine, sounds.dungeon.background.name, {
    loop: true,
    volume: config.musicVolume,
  });

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

        //Add boss door
        if (object.name === LAYER_OBJECTS.bossDoor) {
          map.add([
            engine.sprite(config.assetsName, {
              frame: gameState.getIsPuzzleSolved() ? frameAtlas.door.open : frameAtlas.door.closed,
            }),
            engine.area({ shape: new engine.Rect(engine.vec2(0, 0), 16, 16) }),
            !gameState.getIsPuzzleSolved() && engine.body({ isStatic: true }),
            engine.pos(object.x, object.y),
            tags.bossEnterance,
          ]);
          continue;
        }

        //Add ghost here
        if (object.name === LAYER_OBJECTS.ghost) {
          entities.ghost = map.add(generateGhost(engine, engine.vec2(object.x, object.y)));

          continue;
        }

        //Add prision door
        if (object.name === LAYER_OBJECTS.prisonDoor) {
          map.add([
            engine.sprite(config.assetsName, {
              frame: playerState.getHasCageKey()
                ? frameAtlas.cageDoor.open
                : frameAtlas.cageDoor.closed,
            }),
            !playerState.getHasCageKey() && engine.area(),
            !playerState.getHasCageKey() && engine.body({ isStatic: true }),
            engine.pos(object.x, object.y),
            tags.prisonDoor,
          ]);
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

  setPlayerInstance(engine, entities.player as PlayerInstance);

  if (!entities.pressButtons.length) {
    return;
  }

  for (const pressButton of entities.pressButtons) {
    addPressButtonAI(engine, pressButton as PressButtonInstance);
  }

  entities.player.onCollide(tags.doorExit, () => {
    backgroundMusic.stop();
    gameState.setPrevScene(SCENE_KEYS.dungeon as PrevScene);
    engine.go(SCENE_KEYS.world);
  });

  entities.player.onCollide(tags.bossEnterance, async () => {
    if (!gameState.getIsPuzzleSolved()) {
      await toast(engine, messages[gameState.getLocale()].closedDoor);
      return;
    }
    backgroundMusic.stop();
    audioState.playSound(engine, sounds.ghost.background.name, {
      volume: config.musicVolume,
    });
    slideYMove(entities.player as PlayerInstance, slideCamY(engine, -180, 1), -50);
  });

  entities.player.onCollide(tags.bossExit, async () => {
    if (!playerState.getHasCageKey()) {
      return;
    }
    slideYMove(entities.player as PlayerInstance, slideCamY(engine, 180, 1), 50);
    audioState.stopSound(sounds.ghost.background.name);
  });

  entities.player.onCollide(tags.puzzleEnterance, async () => {
    if (gameState.getIsPuzzleSolved()) {
      toast(engine, messages[gameState.getLocale()].solvedPuzzle);

      return;
    }

    slideXMove(entities.player as PlayerInstance, slideCamX(engine, 325, 1), 40);
  });

  entities.player.onCollide(tags.puzzleExit, async () => {
    slideXMove(entities.player as PlayerInstance, slideCamX(engine, -325, 1), -40);
  });

  entities.player.onCollide(tags.prisonDoor, async (prisonDoor) => {
    await dialog(
      engine,
      engine.vec2(200, 500),
      sonLines[gameState.getLocale()][playerState.getHasCageKey() ? 1 : 0]
    );

    if (playerState.getHasCageKey()) {
      prisonDoor.frame = frameAtlas.cageDoor.open;
      prisonDoor.unuse("body");
      prisonDoor.unuse("area");
      gameState.setIsSonSaved(true);
    }
  });

  entities.player.onCollide(tags.son, async () => {
    await dialog(engine, engine.vec2(200, 500), sonLines[gameState.getLocale()][2]);
  });

  if (!entities.ghost) {
    return;
  }

  setGhostAI(engine, entities.ghost as GhostInstance, entities.player as PlayerInstance);
  setGhostImpact(engine, entities.ghost as GhostInstance);
  onGhostDestroy(engine);

  healthBar(engine);
  coinsBar(engine);
  potionsBar(engine);
};

export default dungeon;
