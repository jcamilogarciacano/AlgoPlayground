import type { SortStep } from './types';

export const generateInsertionSortSteps = (input: number[]): SortStep[] => {
  const arr = [...input];
  const steps: SortStep[] = [];

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      steps.push({ type: 'compare', indices: [j, j + 1], arraySnapshot: [...arr] });
      arr[j + 1] = arr[j];
      steps.push({ type: 'swap', indices: [j, j + 1], arraySnapshot: [...arr] });
      j -= 1;
    }

    arr[j + 1] = key;
    steps.push({ type: 'insert', indices: [j + 1, i], arraySnapshot: [...arr] });
  }

  steps.push({ type: 'done', indices: [-1, -1], arraySnapshot: [...arr] });
  return steps;
};
