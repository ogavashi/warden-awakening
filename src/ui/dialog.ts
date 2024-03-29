import { GameObj, KaboomCtx, TextComp, Vec2 } from "kaboom";

const displayLine = async (textContainer: GameObj<TextComp>, line: string) => {
  for (const char of line) {
    await new Promise((resolve) => {
      setTimeout(() => {
        textContainer.text += char;
        resolve(void 0);
      }, 10);
    });
  }
};

export const dialog = async (engine: KaboomCtx, pos: Vec2, content: string[]) => {
  const dialogBox = engine.add([engine.rect(800, 200), engine.pos(pos), engine.fixed()]);
  const textContainer = dialogBox.add([
    engine.text("", {
      width: 750,
      lineSpacing: 15,
      size: 28,
    }),
    engine.color(0, 0, 0),
    engine.pos(20, 20),
    engine.fixed(),
  ]);

  await displayLine(textContainer, content[content.length - 2]);
};
