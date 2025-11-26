export type SortStepType = 'compare' | 'swap' | 'insert' | 'done';

export type SortStep = {
  type: SortStepType;
  indices: [number, number];
  arraySnapshot: number[];
};
