import { GlobalStateManagerInstance, Locale, PrevScene } from "@types";

const globalStateManager = () => {
  let instance: GlobalStateManagerInstance | null = null;

  const createInstance = (): GlobalStateManagerInstance => {
    let freezePlayer: boolean = false;
    let fontSize: number = 28;
    let locale: Locale = Locale.ENG;
    let prevScene: PrevScene = null;
    let isPuzzleSolved: boolean = false;
    let isSonSaved: boolean = false;

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
      setPrevScene: (val: PrevScene) => {
        prevScene = val;
      },
      getPrevScene: () => prevScene,
      setIsPuzzleSolved: (val: boolean) => {
        isPuzzleSolved = val;
      },
      getIsPuzzleSolved: () => isPuzzleSolved,
      setIsSonSaved: (val: boolean) => {
        isSonSaved = val;
      },
      getIsSonSaved: () => isSonSaved,
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
