import { Locale } from "@types";

const ukrainian = {
  getSword: "Ви отримали меч.",
  getShield: "Ви отримали щит.",
  skip: "Пробіл для продовження.",
  closedDoor: "Мені потрібно відкрити двері..",
  solvedPuzzle: "Мені сюди не потрібно.",
  cancel: "Пробіл для скасування.",
};
const english = {
  getSword: "You have obtained a sword.",
  getShield: "You have obtained a shield.",
  skip: "Press space to continue.",
  closedDoor: "I must open this door...",
  solvedPuzzle: "No need to go there.",
  cancel: "Press space to cancel",
};

export const messages: { [key in Locale]: { [key in string]: string } } = {
  english,
  ukrainian,
};
