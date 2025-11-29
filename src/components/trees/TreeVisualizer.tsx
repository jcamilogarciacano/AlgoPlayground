import React, { useMemo } from 'react';
import type { BSTNode, BSTRoot } from '../../algorithms/trees/bst';

export type TreeHighlight = {
  current?: number | null;
  inserted?: number | null;
  deleted?: number | null;
};

type TreeVisualizerProps = {
  root: BSTRoot;
  highlight: TreeHighlight;
  status: string;
};

const buildLevels = (root: BSTRoot, maxDepth = 6): (BSTNode | null)[][] => {
  if (!root) return [];
  const levels: (BSTNode | null)[][] = [[root]];

  for (let depth = 1; depth < maxDepth; depth += 1) {
    const prev = levels[depth - 1];
    const next: (BSTNode | null)[] = [];
    let hasRealNode = false;

    for (const node of prev) {
      if (node) {
        next.push(node.left);
        next.push(node.right);
        if (node.left || node.right) hasRealNode = true;
      } else {
        next.push(null, null);
      }
    }

    if (!hasRealNode && next.every((n) => n === null)) break;
    levels.push(next);
  }

  return levels;
};

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ root, highlight, status }) => {
  const levels = useMemo(() => buildLevels(root), [root]);
  const maxSlots = levels[levels.length - 1]?.length || 1;

  return (
    <div className="panel visualizer tree-visualizer">
      <div className="visualizer-header">
        <div className="visualizer-title">Binary Search Tree</div>
        <div className="muted">{status}</div>
      </div>

      {!root ? (
        <div className="grid-placeholder">Insert values to see the tree</div>
      ) : (
        <div className="tree-levels">
          {levels.map((level, levelIndex) => {
            const span = Math.max(1, Math.floor(maxSlots / level.length));
            return (
              <div
                key={`level-${levelIndex}`}
                className="tree-level-grid"
                style={{ gridTemplateColumns: `repeat(${maxSlots}, minmax(32px, 1fr))` }}
              >
                {level.map((node, idx) => {
                  const nodeKey = node ? `${node.value}-${idx}-${levelIndex}` : `empty-${idx}-${levelIndex}`;
                  const classNames = ['tree-node'];
                  if (!node) classNames.push('empty');
                  if (node && highlight.inserted === node.value) classNames.push('inserted');
                  if (node && highlight.deleted === node.value) classNames.push('deleted');
                  if (node && highlight.current === node.value) classNames.push('current');

                  return (
                    <div key={nodeKey} className="tree-slot" style={{ gridColumn: `span ${span}` }}>
                      {node ? <div className={classNames.join(' ')}>{node.value}</div> : <div className="tree-placeholder" />}
                      {node && (node.left || node.right) ? (
                        <div className="tree-branches">
                          <span className={`branch left ${node.left ? 'active' : ''}`} />
                          <span className={`branch right ${node.right ? 'active' : ''}`} />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TreeVisualizer;
