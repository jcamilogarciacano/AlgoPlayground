import { useCallback, useEffect, useMemo, useState } from 'react';
import SortingControls, { SortingAlgorithmKey } from '../components/sorting/SortingControls';
import SortingVisualizer, { Highlight } from '../components/sorting/SortingVisualizer';
import { generateBubbleSortSteps } from '../algorithms/sorting/bubbleSort';
import { generateInsertionSortSteps } from '../algorithms/sorting/insertionSort';
import type { SortStep } from '../algorithms/sorting/types';

const generateRandomArray = (size: number) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
};

const sortingAlgorithms: Record<
  SortingAlgorithmKey,
  { label: string; description: string; generate: (arr: number[]) => SortStep[] }
> = {
  bubble: {
    label: 'Bubble Sort',
    description: 'Compare neighbors and bubble the largest items toward the end of the array.',
    generate: generateBubbleSortSteps,
  },
  insertion: {
    label: 'Insertion Sort',
    description: 'Grow a sorted prefix by inserting each element into its correct position.',
    generate: generateInsertionSortSteps,
  },
};

const SortingPage = () => {
  const [algorithm, setAlgorithm] = useState<SortingAlgorithmKey>('bubble');
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(400);
  const [values, setValues] = useState<number[]>(() => generateRandomArray(20));
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayArray, setDisplayArray] = useState<number[]>(values);
  const [highlighted, setHighlighted] = useState<Highlight>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepInfo, setStepInfo] = useState('Ready to sort');

  useEffect(() => {
    const nextSteps = sortingAlgorithms[algorithm].generate(values);
    setSteps(nextSteps);
    setCurrentStepIndex(0);
    setDisplayArray(values);
    setHighlighted(null);
    setIsPlaying(false);
    setStepInfo('Ready to sort');
  }, [algorithm, values]);

  const handleStep = useCallback(() => {
    setCurrentStepIndex((idx) => {
      const step = steps[idx];
      if (!step) {
        setIsPlaying(false);
        return idx;
      }

      setDisplayArray(step.arraySnapshot);
      setHighlighted(step.indices[0] >= 0 ? step.indices : null);

      const description =
        step.type === 'done'
          ? 'Sorted!'
          : step.type === 'swap'
            ? `Swapping indices ${step.indices[0]} and ${step.indices[1]}`
            : step.type === 'insert'
              ? `Inserting value at index ${step.indices[0]}`
              : `Comparing indices ${step.indices[0]} and ${step.indices[1]}`;
      setStepInfo(description);

      const next = idx + 1;
      if (next >= steps.length) {
        setIsPlaying(false);
      }
      return next;
    });
  }, [steps]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      handleStep();
    }, Math.max(speed, 60));

    return () => window.clearInterval(interval);
  }, [handleStep, isPlaying, speed]);

  const randomizeArray = useCallback(() => {
    setValues(generateRandomArray(arraySize));
  }, [arraySize]);

  const handleSizeChange = (size: number) => {
    setArraySize(size);
    setValues(generateRandomArray(size));
  };

  const togglePlay = () => {
    if (currentStepIndex >= steps.length) {
      setCurrentStepIndex(0);
      setDisplayArray(values);
      setHighlighted(null);
    }
    setIsPlaying((prev) => !prev);
  };

  const handleStepClick = () => {
    setIsPlaying(false);
    handleStep();
  };

  const progressText = useMemo(() => {
    if (!steps.length) return 'No steps yet';
    const current = Math.min(currentStepIndex, steps.length);
    return `Step ${current}/${steps.length}`;
  }, [currentStepIndex, steps.length]);

  return (
    <div className="page sorting-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Visualization</p>
          <h2>Sorting Playground</h2>
          <p className="muted">{sortingAlgorithms[algorithm].description}</p>
        </div>
        <div className="chip">{sortingAlgorithms[algorithm].label}</div>
      </div>

      <SortingControls
        isPlaying={isPlaying}
        speed={speed}
        size={arraySize}
        algorithm={algorithm}
        onRandomize={randomizeArray}
        onPlayPause={togglePlay}
        onStep={handleStepClick}
        onSpeedChange={setSpeed}
        onSizeChange={handleSizeChange}
        onAlgorithmChange={(value) => setAlgorithm(value)}
      />

      <SortingVisualizer
        values={displayArray}
        highlighted={highlighted}
        algorithmName={sortingAlgorithms[algorithm].label}
        stepInfo={`${stepInfo} · ${progressText}`}
      />
    </div>
  );
};

export default SortingPage;
