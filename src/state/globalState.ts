import { GlobalStateManagerInstance, Locale } from "@types";

const globalStateManager = () => {
  let instance: GlobalStateManagerInstance | null = null;

  const createInstance = (): GlobalStateManagerInstance => {
    let freezePlayer: boolean = false;
    let fontSize: number = 28;
    let locale: Locale = Locale.ENG;

    return {
      setFreezePlayer: (val: boolean) => {
        freezePlayer = val;
      },
      getFreezePlayer: () => freezePlayer,
      setFontSize: (val: number) => {
        fontSize = val;
      },
      getFontSize: () => fontSize,
      setLocale: (val: Locale) => {
        locale = val;
      },
      getLocale: () => locale,
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

export default globalStateManager;
