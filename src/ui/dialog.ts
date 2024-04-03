import { gameState } from "@state";
import { KaboomCtx, Vec2 } from "kaboom";
import { displayLine } from "./displayLine";

export const dialog = async (engine: KaboomCtx, pos: Vec2, content: string[]) => {
  gameState.setFreezePlayer(true);

  const dialogBox = engine.add([engine.rect(800, 200), engine.pos(pos), engine.fixed()]);

  const textContainer = dialogBox.add([
    engine.text("", {
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    engine.color(0, 0, 0),
    engine.pos(20, 20),
    engine.fixed(),
  ]);

  let index = 0;

  await new Promise<void>(async (resolve) => {
    await displayLine(textContainer, content[index]);

    let lineFinished = true;
    const dialogKey = engine.onKeyPress("space", async () => {
      if (!lineFinished) return;

      index++;

      if (!content[index]) {
        engine.destroy(dialogBox);
        dialogKey.cancel();
        gameState.setFreezePlayer(false);
        resolve();
        return;
      }

      textContainer.text = "";
      lineFinished = false;
      await displayLine(textContainer, content[index]);
      lineFinished = true;
    });
  });
};
