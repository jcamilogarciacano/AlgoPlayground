export type CellCoord = {
  row: number;
  col: number;
};

export type GridCell = CellCoord & {
  isWall: boolean;
  isStart: boolean;
  isGoal: boolean;
};

export type GridMatrix = GridCell[][];

export type BFSPathStep = {
  current: CellCoord;
  newVisited: CellCoord[];
  path: CellCoord[];
};
