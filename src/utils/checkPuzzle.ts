import { config, sounds, tags } from "@common";
import { audioState, gameState } from "@state";
import { BoxInstance } from "@types";
import { KaboomCtx } from "kaboom";

export const checkPuzzle = (engine: KaboomCtx) => {
  const boxes = engine.get(tags.box, { recursive: true }) as BoxInstance[];

  const isSolved = boxes.every((box) => box.isPlaced);

  if (isSolved) {
    gameState.setIsPuzzleSolved(true);
    audioState.playSound(engine, sounds.game.puzzleSolved.name, {
      volume: config.effectsVolums,
    });

    return;
  }

  gameState.setIsPuzzleSolved(false);
};
