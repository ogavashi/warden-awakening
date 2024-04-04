import { ActiveAudio, AudioStateManagerInstance } from "@types";

const AudioStateManager = () => {
  let instance: AudioStateManagerInstance | null = null;

  const createInstance = (): AudioStateManagerInstance => {
    let activeSounds: ActiveAudio = {};

    return {
      playSound: (engine, soundName, options) => {
        const sound = engine.play(soundName, options);
        activeSounds[soundName] = sound;

        return sound;
      },
      stopSound: (soundName) => {
        const sound = activeSounds[soundName];
        if (sound) {
          sound.stop();
        }
      },
      stopAll: () => {
        Object.values(activeSounds).forEach((sound) => sound.stop());
      },
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

export default AudioStateManager;
