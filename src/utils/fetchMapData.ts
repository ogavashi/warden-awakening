export const fetchMapData = async (mapPath: string) => {
  const rawMapData = await fetch(mapPath);
  const map = await rawMapData.json();

  return map;
};
