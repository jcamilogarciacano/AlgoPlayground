import type { BFSPathStep, CellCoord, GridCell, GridMatrix } from './types';

const key = (cell: CellCoord) => `${cell.row}-${cell.col}`;

const getNeighbors = (grid: GridMatrix, cell: CellCoord) => {
  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const neighbors: GridCell[] = [];
  for (const [dr, dc] of deltas) {
    const nr = cell.row + dr;
    const nc = cell.col + dc;
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) continue;
    neighbors.push(grid[nr][nc]);
  }
  return neighbors;
};

const rebuildPath = (parents: Map<string, string>, goalKey: string, startKey: string): CellCoord[] => {
  const path: CellCoord[] = [];
  let currentKey: string | undefined = goalKey;
  while (currentKey) {
    const [row, col] = currentKey.split('-').map(Number);
    path.push({ row, col });
    if (currentKey === startKey) break;
    currentKey = parents.get(currentKey);
  }
  return path.reverse();
};

export const bfs = (grid: GridMatrix): BFSPathStep[] => {
  const steps: BFSPathStep[] = [];

  let start: GridCell | undefined;
  let goal: GridCell | undefined;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.isStart) start = cell;
      if (cell.isGoal) goal = cell;
    }
  }

  if (!start || !goal) return steps;

  const startKey = key(start);
  const goalKey = key(goal);
  const visited = new Set<string>([startKey]);
  const parents = new Map<string, string>();
  const queue: GridCell[] = [start];

  steps.push({ current: { row: start.row, col: start.col }, newVisited: [start], path: [] });

  while (queue.length) {
    const current = queue.shift() as GridCell;
    const currentKey = key(current);

    if (currentKey === goalKey) {
      const path = rebuildPath(parents, goalKey, startKey);
      steps.push({ current: { row: current.row, col: current.col }, newVisited: [], path });
      break;
    }

    const neighbors = getNeighbors(grid, current);
    const newlyVisited: CellCoord[] = [];

    for (const neighbor of neighbors) {
      const neighborKey = key(neighbor);
      if (visited.has(neighborKey) || neighbor.isWall) continue;
      visited.add(neighborKey);
      parents.set(neighborKey, currentKey);
      queue.push(neighbor);
      newlyVisited.push({ row: neighbor.row, col: neighbor.col });
    }

    steps.push({
      current: { row: current.row, col: current.col },
      newVisited: newlyVisited,
      path: [],
    });
  }

  return steps;
};
