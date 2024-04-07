import { Scenes } from "@types";
import world from "./world";
import house from "./house";
import shop from "./shop";
import dungeon from "./dungeon";
import mainMenu from "./menu";
import gameOver from "./gameOver";

const scenes: Scenes = {
  world,
  house,
  shop,
  dungeon,
  mainMenu,
  gameOver,
};

export default scenes;
