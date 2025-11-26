import React from 'react';

type SortingControlsProps = {
  isPlaying: boolean;
  speed: number;
  size: number;
  onRandomize: () => void;
  onPlayPause: () => void;
  onStep: () => void;
  onSpeedChange: (value: number) => void;
  onSizeChange: (value: number) => void;
};

const SortingControls: React.FC<SortingControlsProps> = ({
  isPlaying,
  speed,
  size,
  onRandomize,
  onPlayPause,
  onStep,
  onSpeedChange,
  onSizeChange,
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
