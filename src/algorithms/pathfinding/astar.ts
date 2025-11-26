import type { CellCoord } from './types';

export const aStar = (_start: CellCoord, _goal: CellCoord) => {
  return { visited: [], path: [] as CellCoord[] };
};
