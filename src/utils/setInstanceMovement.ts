import { INTSANCE_STATES } from "@common";
import { GameInstance } from "@types";

export const setInstanceMovement = (obj: GameInstance) => {
  switch (obj.state as keyof typeof INTSANCE_STATES) {
    case "right":
      obj.move(obj.speed, 0);
      break;
    case "left":
      obj.move(-obj.speed, 0);
      break;
    case "up":
      obj.move(0, -obj.speed);
      break;
    case "down":
      obj.move(0, obj.speed);
      break;
    default:
  }
};
