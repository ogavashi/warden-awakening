import { animationKeys } from "./animationKeys";

export const spriteAtlas = {
  [animationKeys.heart.fullHeart]: {
    x: 0,
    y: 224,
    width: 48,
    height: 48,
  },
  [animationKeys.heart.halfHeart]: {
    x: 48,
    y: 224,
    width: 48,
    height: 48,
  },
  [animationKeys.heart.emptyHeart]: {
    x: 96,
    y: 224,
    width: 48,
    height: 48,
  },
  [animationKeys.coin.static]: {
    x: 528,
    y: 384,
    width: 16,
    height: 16,
  },
  [animationKeys.potion.crimson]: {
    x: 368,
    y: 48,
    width: 16,
    height: 16,
  },
  [animationKeys.potion.emerald]: {
    x: 384,
    y: 48,
    width: 16,
    height: 16,
  },
};
