export type BSTNode = {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
};

export type BSTRoot = BSTNode | null;

export const createNode = (value: number): BSTNode => ({ value, left: null, right: null });

const cloneNode = (node: BSTNode, overrides: Partial<BSTNode>): BSTNode => ({
  value: overrides.value ?? node.value,
  left: overrides.left ?? node.left,
  right: overrides.right ?? node.right,
});

export const insert = (root: BSTRoot, value: number): BSTRoot => {
  if (!root) return createNode(value);

  if (value === root.value) return cloneNode(root, {}); // ignore duplicates
  if (value < root.value) {
    const left = insert(root.left, value);
    return cloneNode(root, { left });
  }
  const right = insert(root.right, value);
  return cloneNode(root, { right });
};

const findMin = (node: BSTNode): BSTNode => {
  let current: BSTNode = node;
  while (current.left) {
    current = current.left;
  }
  return current;
};

export const remove = (root: BSTRoot, value: number): BSTRoot => {
  if (!root) return null;

  if (value < root.value) {
    return cloneNode(root, { left: remove(root.left, value) });
  }
  if (value > root.value) {
    return cloneNode(root, { right: remove(root.right, value) });
  }

  // Found node to remove
  if (!root.left && !root.right) return null;
  if (!root.left) return root.right;
  if (!root.right) return root.left;

  const successor = findMin(root.right);
  return cloneNode(root, {
    value: successor.value,
    right: remove(root.right, successor.value),
  });
};

export const search = (root: BSTRoot, value: number): BSTNode | null => {
  let current = root;
  while (current) {
    if (value === current.value) return current;
    current = value < current.value ? current.left : current.right;
  }
  return null;
};

export const searchPath = (root: BSTRoot, value: number): BSTNode[] => {
  const path: BSTNode[] = [];
  let current = root;
  while (current) {
    path.push(current);
    if (value === current.value) break;
    current = value < current.value ? current.left : current.right;
  }
  return path;
};

export const buildTreeFromArray = (values: number[]): BSTRoot => {
  return values.reduce<BSTRoot>((rootAcc, val) => insert(rootAcc, val), null);
};
