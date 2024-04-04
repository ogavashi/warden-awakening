import { PlayerStateManagerInstance } from "@types";

const playerStateManager = () => {
  let instance: PlayerStateManagerInstance | null = null;

  const createInstance = (): PlayerStateManagerInstance => {
    const maxHealth = 3;

    let coinsCollected = 0;
    let hasSword = true;
    let hasShield = false;
    let health = maxHealth;
    let hasBossKey = false;
    let hasCageKey = false;

    return {
      setHasSword: (val) => {
        hasSword = val;
      },
      getHasSword: () => hasSword,
      setHasShield: (val) => {
        hasShield = val;
      },
      getHasShield: () => hasShield,
      getMaxHealth: () => maxHealth,
      setHealth: (val) => {
        health = val;
      },
      getHealth: () => health,
      setCoinsCollected: (val) => {
        coinsCollected = val;
      },
      getCoinsCollected: () => coinsCollected,
      setHasBossKey: (val) => {
        hasBossKey = val;
      },
      getHasBossKey: () => hasBossKey,
      setHasCageKey: (val) => {
        hasCageKey = val;
      },
      getHasCageKey: () => hasCageKey,
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
};

export default playerStateManager;
