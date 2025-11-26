import React from 'react';

export type Highlight = [number, number] | null;

type SortingVisualizerProps = {
  values: number[];
  highlighted: Highlight;
  algorithmName: string;
  stepInfo?: string;
};

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ values, highlighted, algorithmName, stepInfo }) => {
  const maxValue = Math.max(...values, 1);

  return (
    <div className="panel visualizer">
      <div className="visualizer-header">
        <div className="visualizer-title">{algorithmName}</div>
        <div className="muted">{stepInfo ?? 'Ready to sort'}</div>
      </div>
      <div className="bars" aria-label="sorting bars">
        {values.map((value, index) => {
          const height = (value / maxValue) * 100;
          const isHighlighted = highlighted ? highlighted.includes(index) : false;
          return (
            <div
              key={index}
              className={`bar ${isHighlighted ? 'bar-active' : ''}`}
              style={{ height: `${height}%` }}
              title={`Index ${index}: ${value}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SortingVisualizer;
