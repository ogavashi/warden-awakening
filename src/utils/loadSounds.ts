import { sounds } from "@common";
import { KaboomCtx } from "kaboom";

export const loadSounds = (engine: KaboomCtx) => {
  //Shop
  engine.loadSound(sounds.shop.background.name, sounds.shop.background.path);
  engine.loadSound(sounds.shop.buy.name, sounds.shop.buy.path);

  //Potion
  engine.loadSound(sounds.potion.emerald.name, sounds.potion.emerald.path);
  engine.loadSound(sounds.potion.crimson.name, sounds.potion.crimson.path);

  //World
  engine.loadSound(sounds.world.background.name, sounds.world.background.path);

  //House
  engine.loadSound(sounds.house.background.name, sounds.house.background.path);

  //Player
  engine.loadSound(sounds.player.sword.attack.name, sounds.player.sword.attack.path);
  engine.loadSound(sounds.player.shield.charged.name, sounds.player.shield.charged.path);
  engine.loadSound(sounds.player.shield.block.name, sounds.player.shield.block.path);

  //Slime
  engine.loadSound(sounds.slime.defeat.name, sounds.slime.defeat.path);

  //Coin
  engine.loadSound(sounds.conin.collect.name, sounds.conin.collect.path);

  //Game
  engine.loadSound(sounds.game.item.pickUp.name, sounds.game.item.pickUp.path);
  engine.loadSound(sounds.game.button.press.name, sounds.game.button.press.path);
  engine.loadSound(sounds.game.puzzleSolved.name, sounds.game.puzzleSolved.path);
  engine.loadSound(sounds.game.gameOver.name, sounds.game.gameOver.path);

  //Ghost
  engine.loadSound(sounds.ghost.attack.name, sounds.ghost.attack.path);
  engine.loadSound(sounds.ghost.background.name, sounds.ghost.background.path);
  engine.loadSound(sounds.ghost.standby.name, sounds.ghost.standby.path);

  //Dungeon
  engine.loadSound(sounds.dungeon.background.name, sounds.dungeon.background.path);

  //Menu
  engine.loadSound(sounds.menu.name, sounds.menu.path);
};
