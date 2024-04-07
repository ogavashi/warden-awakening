import { TraderStateManagerInstance } from "@types";

const traderStateManager = () => {
  let instance: TraderStateManagerInstance | null = null;

  const createInstance = (): TraderStateManagerInstance => {
    let talkedNum: number = 0;

    return {
      setTalkedNum: (val) => {
        talkedNum = val;
      },
      getTalkedNum: () => talkedNum,
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

export default traderStateManager;
