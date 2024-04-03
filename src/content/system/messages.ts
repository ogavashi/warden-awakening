import { Locale } from "@types";

const ukrainian = {
  getSword: "Ви отримали меч.",
  skip: "Натисніть пробіл для продовження.",
};
const english = {
  getSword: "You have obtained a sword.",
  skip: "Press space to continue.",
};

export const messages: { [key in Locale]: { [key in string]: string } } = {
  english,
  ukrainian,
};
