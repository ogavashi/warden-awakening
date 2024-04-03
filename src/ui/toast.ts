import { KaboomCtx, Vec2 } from "kaboom";
import { displayLine } from "./displayLine";
import { gameState } from "@state";
import { messages } from "@content";

export const toast = async (
  engine: KaboomCtx,
  content: string,
  pos: Vec2 = engine.vec2(350, 200)
) => {
  gameState.setFreezePlayer(true);

  const toastBox = engine.add([
    engine.rect(500, 200),
    engine.pos(pos),
    engine.fixed(),
    engine.outline(5),
  ]);
  const textContainer = toastBox.add([
    engine.text("", {
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    engine.color(0, 0, 0),
    engine.pos(20, 20),
    engine.fixed(),
  ]);

  const textHelperContainer = toastBox.add([
    engine.text("", {
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    engine.color(0, 0, 0),
    engine.opacity(0.5),
    engine.pos(60, 160),
    engine.fixed(),
  ]);

  await new Promise<void>(async (resolve) => {
    await displayLine(textContainer, content);
    await displayLine(textHelperContainer, messages[gameState.getLocale()].skip);

    const toastKey = engine.onKeyPress("space", async () => {
      textContainer.text = "";
      engine.destroy(toastBox);
      toastKey.cancel();
      gameState.setFreezePlayer(false);
      resolve();
    });
  });
};
