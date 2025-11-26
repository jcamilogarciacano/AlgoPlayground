export type GridPoint = { x: number; y: number };

export const bfs = (_start: GridPoint, _goal: GridPoint) => {
  return { visited: [], path: [] as GridPoint[] };
};
