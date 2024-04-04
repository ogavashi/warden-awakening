import AudioStateManager from "./audioState";
import globalStateManager from "./globalState";
import oldmanStateManager from "./oldmanState";
import playerStateManager from "./playerState";

export const gameState = globalStateManager().getInstance();
export const oldmanState = oldmanStateManager().getInstance();
export const playerState = playerStateManager().getInstance();
export const audioState = AudioStateManager().getInstance();
