import React from 'react';

export type SortingAlgorithmKey = 'bubble' | 'insertion';

type SortingControlsProps = {
  isPlaying: boolean;
  speed: number;
  size: number;
  algorithm: SortingAlgorithmKey;
  onRandomize: () => void;
  onPlayPause: () => void;
  onStep: () => void;
  onSpeedChange: (value: number) => void;
  onSizeChange: (value: number) => void;
  onAlgorithmChange: (value: SortingAlgorithmKey) => void;
};

const SortingControls: React.FC<SortingControlsProps> = ({
  isPlaying,
  speed,
  size,
  algorithm,
  onRandomize,
  onPlayPause,
  onStep,
  onSpeedChange,
  onSizeChange,
  onAlgorithmChange,
}) => {
  return (
    <div className="panel controls">
      <div className="control-row">
        <button className="btn" onClick={onRandomize}>Randomize array</button>
        <button className="btn" onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button className="btn" onClick={onStep}>Step</button>
      </div>

      <div className="sliders">
        <label className="slider">
          <span>Algorithm</span>
          <select value={algorithm} onChange={(e) => onAlgorithmChange(e.target.value as SortingAlgorithmKey)}>
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
          </select>
        </label>

        <label className="slider">
          <span>Speed: {speed} ms</span>
          <input
            type="range"
            min={60}
            max={1200}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
        </label>

        <label className="slider">
          <span>Array size: {size}</span>
          <input
            type="range"
            min={5}
            max={50}
            value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default SortingControls;
