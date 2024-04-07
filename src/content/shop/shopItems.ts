import { Locale } from "@types";
import { Key } from "kaboom";

const english = {
  items: [
    {
      id: 1,
      price: 3,
      title: "Crimson potion",
      description: "Fully restores health.",
      key: "1" as Key,
    },
    {
      id: 2,
      price: 1,
      title: "Emerald potion",
      description: "Restores one heart.",
      key: "2" as Key,
    },
  ],
};
const ukrainian = {
  items: [
    {
      id: 1,
      price: 3,
      title: "Червоне зілля",
      description: "Повністю відновлює здоров'я.",
      key: "1" as Key,
    },
    {
      id: 2,
      price: 1,
      title: "Зелене зілля",
      description: "Відновлює одне серце.",
      key: "2" as Key,
    },
  ],
};

export const shopItems: {
  [key in Locale]: {
    items: { id: number; price: number; title: string; description: string; key: Key }[];
  };
} = {
  english,
  ukrainian,
};
