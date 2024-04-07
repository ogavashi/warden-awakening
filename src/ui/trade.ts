import { messages, shopItems } from "@content";
import { audioState, gameState, playerState } from "@state";
import { KaboomCtx, Vec2 } from "kaboom";
import { displayLine } from "./displayLine";
import { config, sounds, tags } from "@common";
import { coinsBar } from "./coinsBar";
import { handlePlayerTradeItems } from "@utils";
import { potionsBar } from "./potionsBar";

export const trade = async (engine: KaboomCtx, pos: Vec2 = engine.vec2(350, 100)) => {
  gameState.setFreezePlayer(true);

  const items = shopItems[gameState.getLocale()].items;
  const itemTextContainers: any[] = [];

  const toastBox = engine.add([
    engine.rect(500, items.length * 175),
    engine.pos(pos),
    engine.fixed(),
    engine.outline(5),
  ]);

  const clearMenu = () => {
    itemTextContainers.forEach((container) => engine.destroy(container));
  };

  const renderMenu = () => {
    //Clear the menu
    clearMenu();

    const playerMoney = playerState.getCoinsCollected();

    //Draw the menu
    for (const [index, item] of items.entries()) {
      const { title, price, description, key } = item;
      const mainText = `${key}. ${title}`;
      const yPos = 20 + index * 140;

      const itemTitle = toastBox.add([
        engine.text(mainText, {
          width: 750,
          lineSpacing: 15,
          size: gameState.getFontSize(),
        }),
        engine.color(0, 0, 0),
        engine.pos(20, yPos),
        engine.fixed(),
      ]);

      const itemDescription = toastBox.add([
        engine.text(`${description}`, {
          width: 750,
          lineSpacing: 15,
          size: gameState.getFontSize(),
        }),
        engine.opacity(0.6),
        engine.color(0, 0, 0),
        engine.pos(20, yPos + 40),
        engine.fixed(),
      ]);

      const itemPrice = toastBox.add([
        engine.text(`Price: ${price}`, {
          width: 750,
          lineSpacing: 15,
          size: gameState.getFontSize(),
        }),
        engine.opacity(0.6),
        playerMoney >= price ? engine.color(0, 255, 127) : engine.color(220, 20, 60),
        engine.pos(20, yPos + 80),
        engine.fixed(),
      ]);

      itemTextContainers.push(...[itemTitle, itemDescription, itemPrice]);
    }
  };

  renderMenu();

  const textHelperContainer = toastBox.add([
    engine.text("", {
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    engine.color(0, 0, 0),
    engine.opacity(0.5),
    engine.pos(60, 300),
    engine.fixed(),
  ]);

  await new Promise<void>(async (resolve) => {
    await displayLine(textHelperContainer, messages[gameState.getLocale()].cancel);

    items.forEach((item) => {
      engine.onKeyPress(item.key, () => {
        const playerMoney = playerState.getCoinsCollected();

        if (playerMoney >= item.price) {
          playerState.setCoinsCollected(playerMoney - item.price);
          handlePlayerTradeItems(item.id);
          audioState.playSound(engine, sounds.shop.buy.name, { volume: config.effectsVolums });
          renderMenu();
          engine.destroyAll(tags.coinsContainer);
          coinsBar(engine);
          engine.destroyAll(tags.potionsContainer);
          potionsBar(engine);
        }
      });
    });

    const cancelKey = engine.onKeyPress("space", async () => {
      clearMenu();
      engine.destroy(toastBox);
      cancelKey.cancel();
      gameState.setFreezePlayer(false);
      resolve();
    });
  });
};
