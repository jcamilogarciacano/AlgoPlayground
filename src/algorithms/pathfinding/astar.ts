import { GridPoint } from './bfs';

export const aStar = (_start: GridPoint, _goal: GridPoint) => {
  return { visited: [], path: [] as GridPoint[] };
};
