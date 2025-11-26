import type { CellCoord } from './types';

export const dijkstra = (_start: CellCoord, _goal: CellCoord) => {
  return { visited: [], path: [] as CellCoord[] };
};
