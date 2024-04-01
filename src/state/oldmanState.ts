import { OldmanStateManagerInstance } from "@types";

const oldmanStateManager = () => {
  let instance: OldmanStateManagerInstance | null = null;

  const createInstance = (): OldmanStateManagerInstance => {
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

export default oldmanStateManager;
