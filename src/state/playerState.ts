import { PlayerStateManagerInstance } from "@types";

const playerStateManager = () => {
  let instance: PlayerStateManagerInstance | null = null;

  const createInstance = (): PlayerStateManagerInstance => {
    const maxHealth = 3;

    let coinsCollected = 0;
    let hasSword = false;
    let hasShield = false;
    let health = maxHealth;
    let hasCageKey = false;
    let crimsonPotions = 0;
    let emeraldPotions = 0;

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
      setHasCageKey: (val) => {
        hasCageKey = val;
      },
      getHasCageKey: () => hasCageKey,
      setEmeraldPotions: (val) => {
        emeraldPotions = val;
      },
      getEmeraldPotions: () => emeraldPotions,
      setCrimsonPotions: (val) => {
        crimsonPotions = val;
      },
      getCrimsonPotions: () => crimsonPotions,
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
