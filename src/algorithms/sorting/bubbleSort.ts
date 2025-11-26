import type { SortStep } from './types';

export const generateBubbleSortSteps = (input: number[]): SortStep[] => {
  const arr = [...input];
  const steps: SortStep[] = [];

  for (let i = 0; i < arr.length; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      steps.push({ type: 'compare', indices: [j, j + 1], arraySnapshot: [...arr] });
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({ type: 'swap', indices: [j, j + 1], arraySnapshot: [...arr] });
      }
    }
  }

  steps.push({ type: 'done', indices: [-1, -1], arraySnapshot: [...arr] });
  return steps;
};
