import { gameState } from "@state";
import { PlayerInstance } from "@types";

export const slideXMove = async (player: PlayerInstance, camSlide: Promise<void>, val: number) => {
  gameState.setFreezePlayer(true);
  player.opacity = 0;
  await camSlide;
  player.pos.x += val;
  player.opacity = 1;
  gameState.setFreezePlayer(false);
};
