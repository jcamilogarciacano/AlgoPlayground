import { useCallback, useEffect, useMemo, useState } from 'react';
import PathfindingVisualizer from '../components/pathfinding/PathfindingVisualizer';
import { bfs } from '../algorithms/pathfinding/bfs';
import type { BFSPathStep, CellCoord, GridMatrix } from '../algorithms/pathfinding/types';

const ROWS = 20;
const COLS = 40;
const START: CellCoord = { row: Math.floor(ROWS / 2), col: 2 };
const GOAL: CellCoord = { row: Math.floor(ROWS / 2), col: COLS - 3 };

const cellKey = (coord: CellCoord) => `${coord.row}-${coord.col}`;

const createGrid = (): GridMatrix => {
  return Array.from({ length: ROWS }, (_, row) =>
    Array.from({ length: COLS }, (_, col) => ({
      row,
      col,
      isStart: row === START.row && col === START.col,
      isGoal: row === GOAL.row && col === GOAL.col,
      isWall: false,
    })),
  );
};

const mapGrid = (grid: GridMatrix, updater: (cell: GridMatrix[number][number]) => GridMatrix[number][number]) =>
  grid.map((row) => row.map((cell) => updater(cell)));

const PathfindingPage = () => {
  const [grid, setGrid] = useState<GridMatrix>(() => createGrid());
  const [steps, setSteps] = useState<BFSPathStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(200);

  useEffect(() => {
    setSteps(bfs(grid));
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [grid]);

  const visualizationState = useMemo(() => {
    const visited = new Set<string>();
    const path = new Set<string>();
    let current: CellCoord | null = null;

    const appliedSteps = Math.min(currentStepIndex, steps.length);
    for (let i = 0; i < appliedSteps; i += 1) {
      const step = steps[i];
      visited.add(cellKey(step.current));
      step.newVisited.forEach((coord) => visited.add(cellKey(coord)));
      if (step.path.length) {
        path.clear();
        step.path.forEach((coord) => path.add(cellKey(coord)));
      }
      current = step.current;
    }

    return { visited, path, current };
  }, [currentStepIndex, steps]);

  const runSingleStep = useCallback(
    (index: number) => {
      if (!steps[index]) {
        setIsPlaying(false);
        return index;
      }
      const nextIndex = index + 1;
      if (nextIndex >= steps.length) {
        setIsPlaying(false);
      }
      return nextIndex;
    },
    [steps],
  );

  const handleStep = useCallback(() => {
    setCurrentStepIndex((idx) => runSingleStep(idx));
  }, [runSingleStep]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setCurrentStepIndex((idx) => {
        if (idx >= steps.length) {
          setIsPlaying(false);
          return idx;
        }
        const next = idx + 1;
        if (next >= steps.length) setIsPlaying(false);
        return next;
      });
    }, Math.max(speed, 60));

    return () => window.clearInterval(id);
  }, [isPlaying, speed, steps.length]);

  const toggleWall = (row: number, col: number) => {
    setGrid((prev) =>
      mapGrid(prev, (cell) => {
        if (cell.row === row && cell.col === col && !cell.isStart && !cell.isGoal) {
          return { ...cell, isWall: !cell.isWall };
        }
        return cell;
      }),
    );
  };

  const randomizeWalls = () => {
    setGrid((prev) =>
      mapGrid(prev, (cell) => {
        if (cell.isStart || cell.isGoal) return { ...cell, isWall: false };
        return { ...cell, isWall: Math.random() < 0.24 };
      }),
    );
  };

  const clearWalls = () => {
    setGrid((prev) =>
      mapGrid(prev, (cell) => {
        if (cell.isWall) return { ...cell, isWall: false };
        return cell;
      }),
    );
  };

  const togglePlay = () => {
    if (currentStepIndex >= steps.length) {
      setCurrentStepIndex(0);
    }
    setIsPlaying((prev) => !prev);
  };

  const stepOnce = () => {
    setIsPlaying(false);
    setCurrentStepIndex((idx) => {
      const target = idx >= steps.length ? 0 : idx;
      return runSingleStep(target);
    });
  };

  const progressText = useMemo(() => {
    if (!steps.length) return 'No steps yet';
    const current = Math.min(currentStepIndex, steps.length);
    return `Step ${current}/${steps.length}`;
  }, [currentStepIndex, steps.length]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Visualization</p>
          <h2>Pathfinding Playground</h2>
          <p className="muted">Run BFS on a grid, mark walls, and watch the search expand layer by layer.</p>
        </div>
        <div className="chip">BFS</div>
      </div>

      <div className="panel controls">
        <div className="control-row">
          <button className="btn" onClick={randomizeWalls}>Randomize walls</button>
          <button className="btn" onClick={clearWalls}>Clear walls</button>
          <button className="btn" onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play BFS'}</button>
          <button className="btn" onClick={stepOnce}>Step</button>
        </div>
        <div className="sliders">
          <label className="slider">
            <span>Speed: {speed} ms</span>
            <input
              type="range"
              min={60}
              max={1200}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </label>
        </div>
      </div>

      <PathfindingVisualizer
        grid={grid}
        visited={visualizationState.visited}
        path={visualizationState.path}
        current={visualizationState.current}
        status={progressText}
        onToggleWall={toggleWall}
      />
    </div>
  );
};

export default PathfindingPage;
