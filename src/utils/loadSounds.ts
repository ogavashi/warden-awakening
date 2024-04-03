import { sounds } from "@common";
import { KaboomCtx } from "kaboom";

export const loadSounds = (engine: KaboomCtx) => {
  //Shop
  engine.loadSound(sounds.shop.background.name, sounds.shop.background.path);

  //World
  engine.loadSound(sounds.world.background.name, sounds.world.background.path);

  //House
  engine.loadSound(sounds.house.background.name, sounds.house.background.path);

  //Player
  engine.loadSound(sounds.player.sword.attack.name, sounds.player.sword.attack.path);

  //Slime
  engine.loadSound(sounds.slime.defeat.name, sounds.slime.defeat.path);

  //Coin
  engine.loadSound(sounds.conin.collect.name, sounds.conin.collect.path);
};