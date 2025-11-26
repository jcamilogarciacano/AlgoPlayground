export type BSTNode = {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
};

export const createNode = (value: number): BSTNode => ({ value, left: null, right: null });
