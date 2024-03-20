import { Map } from "@types";

export const fetchMapData = async (mapPath: string): Promise<Map> => {
  const rawMapData = await fetch(mapPath);
  const map = await rawMapData.json();

  return map;
};
