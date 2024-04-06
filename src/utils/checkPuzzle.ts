import { config, frameAtlas, sounds, tags } from "@common";
import { audioState, gameState } from "@state";
import { BoxInstance } from "@types";
import { KaboomCtx, SpriteComp } from "kaboom";

export const checkPuzzle = (engine: KaboomCtx) => {
  const boxes = engine.get(tags.box, { recursive: true }) as BoxInstance[];
  const [door] = engine.get(tags.bossEnterance, { recursive: true }) as unknown as SpriteComp[];

  const isSolved = boxes.every((box) => box.isPlaced);

  if (isSolved) {
    door.frame = frameAtlas.door.open;

    gameState.setIsPuzzleSolved(true);
    audioState.playSound(engine, sounds.game.puzzleSolved.name, {
      volume: config.effectsVolums,
    });

    return;
  }

  door.frame = frameAtlas.door.closed;
  gameState.setIsPuzzleSolved(false);
};
