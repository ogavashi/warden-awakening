import { playerState } from "@state";

export const handlePlayerTradeItems = (id: number) => {
  if (id === 1) {
    playerState.setCrimsonPotions(playerState.getCrimsonPotions() + 1);

    return;
  }

  if (id === 2) {
    playerState.setEmeraldPotions(playerState.getEmeraldPotions() + 1);

    return;
  }
};
