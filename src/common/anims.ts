import { animationKeys } from "./animationKeys";

export const anims = {
  // Player
  [animationKeys.player.idle.down]: 944,
  [animationKeys.player.down]: {
    from: 944,
    to: 947,
    loop: true,
  },
  [animationKeys.player.idle.side]: 984,
  [animationKeys.player.side]: {
    from: 984,
    to: 986,
    loop: true,
  },
  [animationKeys.player.idle.up]: 1022,
  [animationKeys.player.up]: {
    from: 1022,
    to: 1025,
    loop: true,
  },
  [animationKeys.player.attack.up]: 1102,
  [animationKeys.player.attack.down]: 1100,
  [animationKeys.player.attack.left]: 1101,
  [animationKeys.player.attack.right]: 1101,
  //Slimes
  [animationKeys.slime.idle.down]: 858,
  [animationKeys.slime.down]: { from: 858, to: 859, loop: true },
  [animationKeys.slime.idle.side]: 860,
  [animationKeys.slime.side]: { from: 860, to: 861, loop: true },
  [animationKeys.slime.idle.up]: 897,
  [animationKeys.slime.up]: { from: 897, to: 898, loop: true },
  //Oldman
  [animationKeys.oldman.down]: 866,
  [animationKeys.oldman.side]: 907,
  [animationKeys.oldman.up]: 905,
  //Trader
  [animationKeys.trader.down]: 788,
  [animationKeys.trader.side]: 829,
  [animationKeys.trader.up]: 827,
  //Coin
  [animationKeys.coin.idle]: {
    from: 969,
    to: 974,
    loop: true,
  },
};
