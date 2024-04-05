import { Locale } from "@types";

const ukrainian = {
  getSword: "Ви отримали меч.",
  skip: "Натисніть пробіл для продовження.",
  closedDoor: "Мені потрібно відкрити ці двері...",
};
const english = {
  getSword: "You have obtained a sword.",
  skip: "Press space to continue.",
  closedDoor: "I must open this door...",
};

export const messages: { [key in Locale]: { [key in string]: string } } = {
  english,
  ukrainian,
};
