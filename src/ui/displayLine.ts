import { GameObj, TextComp } from "kaboom";

export const displayLine = async (textContainer: GameObj<TextComp>, line: string) => {
  for (const char of line) {
    await new Promise((resolve) => {
      setTimeout(() => {
        textContainer.text += char;
        resolve(void 0);
      }, 10);
    });
  }
};
