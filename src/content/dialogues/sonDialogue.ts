import { Locale } from "@types";

const english = [
  [
    "Help me!",
    "I'm held prisoner here.",
    "The keys are held by a ghost in the next room!",
    "To get to the next room, you must solve the ancient puzzle guarded by enchanted statues.",
    "Legend speaks of this cursed castle, once home to a powerful sorcerer who delved too deeply into forbidden magic.",
    "His experiments twisted the very fabric of reality, unleashing chaos upon the land.",
    "Now, his restless spirit haunts these halls, guarding his secrets from intruders.",
  ],
  ["Wow! You got the keys!", "Thanks for saving me!"],
  [
    "Thanks again for saving me!",
    "Go talk to my father, he'll reward you handsomely!",
    "But be warned, the sorcerer's curse still lingers. Tread carefully, adventurer.",
    "Remember, adventurer, the spirits of this place hold many secrets.",
    "May your journey be filled with bravery and wisdom.",
    "May the light guide you through the darkness.",
  ],
];

const ukrainian = [
  [
    "Допоможіть мені!",
    "Я ув'язнений тут.",
    "Ключі у триманні привиду в наступній кімнаті!",
    "Щоб потрапити в наступну кімнату, тобі потрібно вирішити старовинну головоломку, охороняються зачарованими статуями.",
    "Легенда розповідає про цей проклятий замок, колись домівку могутнього чаклуна, який заглибився надто глибоко у заборонену магію.",
    "Його експерименти спотворили саму тканину реальності, вивільнивши хаос на землю.",
    "Тепер його неспокійний дух блукає цими залами, оберігаючи свої таємниці від вторгнення.",
  ],
  ["Вау! Ти знайшов ключі!", "Дякую, що мене врятував!"],
  [
    "Знову дякую за порятунок!",
    "Піди поговори з моїм батьком, він винагородить тебе гідно!",
    "Але будь обережний, прокляття чаклуна все ще висить у повітрі. Ступай обережно, авантюристе.",
    "Пам'ятай, авантюристе, духи цього місця приховують багато таємниць.",
    "Нехай твій шлях буде сповнений мужності та мудрості.",
    "Нехай світло веде тебе через темряву.",
  ],
];

export const sonLines: { [key in Locale]: string[][] } = {
  english,
  ukrainian,
};
