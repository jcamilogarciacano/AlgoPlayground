import React from 'react';
import Grid from './Grid';
import type { CellCoord, GridMatrix } from '../../algorithms/pathfinding/types';

type PathfindingVisualizerProps = {
  grid: GridMatrix;
  visited: Set<string>;
  path: Set<string>;
  current: CellCoord | null;
  status: string;
  onToggleWall: (row: number, col: number) => void;
};

const PathfindingVisualizer: React.FC<PathfindingVisualizerProps> = ({
  grid,
  visited,
  path,
  current,
  status,
  onToggleWall,
}) => {
  return (
    <div className="panel visualizer">
      <div className="visualizer-header">
        <div className="visualizer-title">Breadth-First Search</div>
        <div className="muted">{status}</div>
      </div>
      <Grid grid={grid} visited={visited} path={path} current={current} onToggleWall={onToggleWall} />
      <div className="legend">
        <span className="legend-item start">S Start</span>
        <span className="legend-item goal">G Goal</span>
        <span className="legend-item visited">Visited</span>
        <span className="legend-item path">Path</span>
        <span className="legend-item wall">Wall</span>
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
