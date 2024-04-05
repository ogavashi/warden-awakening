export const animationKeys = {
  player: {
    idle: {
      down: "player-idle-down",
      side: "player-idle-side",
      up: "player-idle-up",
    },
    down: "player-down",
    side: "player-side",
    up: "player-up",
    attack: {
      up: "player-attack-up",
      down: "player-attack-down",
      left: "player-attack-left",
      right: "player-attack-right",
    },
  },
  slime: {
    idle: {
      down: "slime-idle-down",
      side: "slime-idle-side",
      up: "slime-idle-up",
    },
    down: "slime-down",
    side: "slime-side",
    up: "slime-up",
  },
  oldman: {
    down: "oldman-down",
    side: "oldman-side",
    up: "oldman-up",
  },
  trader: { down: "trader-down", side: "trader-side", up: "trader-up" },
  coin: {
    idle: "coin-idle",
    static: "coin-static",
  },
  heart: {
    fullHeart: "full-heart",
    emptyHeart: "empty-heart",
    halfHeart: "half-heart",
  },
  button: {
    unPressed: "unpressed",
    pressed: "pressed",
  },
};
