import { anims } from "./anims";

export const config = {
  assetsName: "assets",
  assetsPath: "./assets/topdownasset.png",
  worldMapPath: "./assets/maps/world.json",
  houseMapPath: "./assets/maps/house.json",
  shopMapPath: "./assets/maps/shop.json",
  dungeonMapPath: "./assets/maps/dungeon.json",

  musicVolume: 0.05,
  effectsVolums: 0.05,

  assetsOptions: {
    sliceX: 39,
    sliceY: 31,
    anims,
  },
};
