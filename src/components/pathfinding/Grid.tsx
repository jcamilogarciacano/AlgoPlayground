import React from 'react';
import type { CellCoord, GridCell, GridMatrix } from '../../algorithms/pathfinding/types';

type GridProps = {
  grid: GridMatrix;
  visited: Set<string>;
  path: Set<string>;
  current: CellCoord | null;
  onToggleWall: (row: number, col: number) => void;
};

const cellKey = (cell: CellCoord) => `${cell.row}-${cell.col}`;

const Grid: React.FC<GridProps> = ({ grid, visited, path, current, onToggleWall }) => {
  const currentKey = current ? cellKey(current) : null;
  const columnCount = grid[0]?.length ?? 0;

  return (
    <div className="grid-wrapper">
      <div className="path-grid" style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(14px, 1fr))` }}>
        {grid.map((row, rowIndex) =>
          row.map((cell: GridCell, colIndex) => {
            const key = cellKey(cell);
            const classes = ['grid-cell'];
            if (cell.isWall) classes.push('wall');
            if (visited.has(key)) classes.push('visited');
            if (path.has(key)) classes.push('path');
            if (currentKey === key) classes.push('current');
            if (cell.isStart) classes.push('start');
            if (cell.isGoal) classes.push('goal');

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                className={classes.join(' ')}
                onClick={() => {
                  if (cell.isStart || cell.isGoal) return;
                  onToggleWall(cell.row, cell.col);
                }}
                aria-label={`Cell ${cell.row},${cell.col}`}
              >
                {cell.isStart ? 'S' : cell.isGoal ? 'G' : ''}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default Grid;
