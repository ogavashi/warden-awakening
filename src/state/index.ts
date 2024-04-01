import globalStateManager from "./globalState";
import oldmanStateManager from "./oldmanState";

export const gameState = globalStateManager().getInstance();
export const oldmanState = oldmanStateManager().getInstance();
