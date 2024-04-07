import { Locale } from "@types";

const english = [
  [
    "Hail, weary traveler, to this shadowed realm!",
    "Approach, if you dare!",
    "Behold, the elixirs of vitality!",
    "The crimson potion, a draught of life's essence, shall restore you to full health, invigorating your spirit!",
    "The emerald elixir, a whisper of nature's power, shall mend but a single heart, offering but a fleeting respite in the darkness.",
    "Two potions offered, yet each carries its own peril!",
  ],
  [
    "A choice made in the depths of shadows...",
    "May your journey be filled with fleeting moments of respite amidst the darkness!",
  ],
  [
    "Your patronage is noted, traveler, in the ledger of shadows.",
    "Remember, Frog Trader lurks ever in the shadowed corners, ready to offer solace in elixirs.",
    "May the potions guide your steps through the labyrinth of shadows.",
  ],
];
const ukrainian = [
  [
    "Ласкаво просимо, втомлений подорожнику, до цього воістину темного світу!",
    "Підходьте, якщо сміливі!",
    "Ось вони, зілля життя!",
    "Червоне зілля, келих життєвої есенції, відновить вас до повного здоров'я, оживляючи ваш дух!",
    "Зелений еліксир, шепіт сили природи, зцілить лише одне серце, пропонуючи лише мить відпочинку у темряві.",
    "Два зілля пропонуються, але кожне несе власну небезпеку!",
  ],
  [
    "Вибір, зроблений у глибинах тіней...",
    "Нехай ваша подорож буде наповнена мимовільними митьми відпочинку серед темряви!",
  ],
  [
    "Ваша підтримка занесена, мандрівник, в літопис тіней.",
    "Пам'ятайте, ми тільки чекаємо в тіні, готові пропонувати утішення в еліксирах.",
    "Нехай зілля керують вашими кроками через лабіринт тіней.",
  ],
];

export const traderLines: { [key in Locale]: string[][] } = {
  english,
  ukrainian,
};
