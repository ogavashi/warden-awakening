import { animationKeys } from "./animationKeys";

export const config = {
  assetsName: "assets",
  assetsPath: "./assets/topdownasset.png",
  worldMapPath: "./assets/maps/world.json",

  assetsOptions: {
    sliceX: 39,
    sliceY: 31,
    anim: {
      [animationKeys.playerIdleDown]: 936,
    },
  },
};
