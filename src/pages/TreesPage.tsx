import { useEffect, useMemo, useState } from 'react';
import TreeVisualizer, { TreeHighlight } from '../components/trees/TreeVisualizer';
import {
  buildTreeFromArray,
  insert,
  remove,
  search,
  searchPath,
  type BSTNode,
  type BSTRoot,
} from '../algorithms/trees/bst';

const TreesPage = () => {
  const [root, setRoot] = useState<BSTRoot>(null);
  const [insertValue, setInsertValue] = useState('');
  const [deleteValue, setDeleteValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [lastInserted, setLastInserted] = useState<number | null>(null);
  const [lastDeleted, setLastDeleted] = useState<number | null>(null);

  const [searchPathNodes, setSearchPathNodes] = useState<BSTNode[]>([]);
  const [searchStep, setSearchStep] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearch, setCurrentSearch] = useState<number | null>(null);
  const [searchTarget, setSearchTarget] = useState<number | null>(null);

  const [status, setStatus] = useState('Ready to build a tree');

  const resetSearchPlayback = () => {
    setIsSearching(false);
    setSearchPathNodes([]);
    setSearchStep(0);
    setCurrentSearch(null);
    setSearchTarget(null);
  };

  const parseInput = (value: string): number | null => {
    if (value.trim() === '') return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  };

  const handleInsert = () => {
    const value = parseInput(insertValue);
    if (value === null) {
      setStatus('Enter a number to insert');
      return;
    }

    const exists = search(root, value);
    if (exists) {
      setStatus(`Value ${value} already exists`);
      return;
    }

    setRoot((prev) => insert(prev, value));
    setLastInserted(value);
    setLastDeleted(null);
    resetSearchPlayback();
    setStatus(`Inserted ${value}`);
  };

  const handleDelete = () => {
    const value = parseInput(deleteValue);
    if (value === null) {
      setStatus('Enter a number to delete');
      return;
    }

    if (!root) {
      setStatus('Tree is empty');
      return;
    }

    const exists = search(root, value);
    setRoot((prev) => remove(prev, value));
    setLastInserted(null);
    setLastDeleted(exists ? value : null);
    resetSearchPlayback();
    setStatus(exists ? `Deleted ${value}` : `Value ${value} not found`);
  };

  const handleSearch = () => {
    const value = parseInput(searchValue);
    if (value === null) {
      setStatus('Enter a number to search for');
      return;
    }
    if (!root) {
      setStatus('Tree is empty');
      return;
    }

    const path = searchPath(root, value);
    setSearchPathNodes(path);
    setSearchTarget(value);
    setSearchStep(0);
    setIsSearching(true);
    setCurrentSearch(path[0]?.value ?? null);
    setStatus(`Searching for ${value}...`);
  };

  useEffect(() => {
    if (!isSearching) return;
    if (!searchPathNodes.length) {
      setIsSearching(false);
      return;
    }

    const currentNode = searchPathNodes[searchStep];
    if (currentNode) {
      setCurrentSearch(currentNode.value);
      setStatus(`Searching for ${searchTarget}... currently at ${currentNode.value}`);
    }

    if (searchStep >= searchPathNodes.length - 1) {
      const last = searchPathNodes[searchPathNodes.length - 1];
      const found = last && last.value === searchTarget;
      setStatus(found ? `Found ${searchTarget}` : `${searchTarget} not found`);
      setIsSearching(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setSearchStep((prev) => prev + 1);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [isSearching, searchPathNodes, searchStep, searchTarget]);

  const handleRandom = () => {
    const length = Math.floor(Math.random() * 5) + 8; // 8-12 numbers
    const values = new Set<number>();
    while (values.size < length) {
      values.add(Math.floor(Math.random() * 90) + 10);
    }
    const nextRoot = buildTreeFromArray(Array.from(values));
    setRoot(nextRoot);
    setLastInserted(null);
    setLastDeleted(null);
    resetSearchPlayback();
    setStatus(`Random tree with ${values.size} nodes`);
  };

  const handleClear = () => {
    setRoot(null);
    setLastInserted(null);
    setLastDeleted(null);
    resetSearchPlayback();
    setStatus('Cleared tree');
  };

  const highlight: TreeHighlight = useMemo(
    () => ({
      inserted: lastInserted,
      deleted: lastDeleted,
      current: currentSearch,
    }),
    [currentSearch, lastDeleted, lastInserted],
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Visualization</p>
          <h2>Binary Search Tree</h2>
          <p className="muted">Insert, delete, and step through searches node by node.</p>
        </div>
        <div className="chip">BST</div>
      </div>

      <div className="panel controls">
        <div className="control-row">
          <label className="input-group">
            <span>Insert</span>
            <input
              type="number"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="e.g. 42"
            />
          </label>
          <button className="btn" onClick={handleInsert}>Insert</button>

          <label className="input-group">
            <span>Delete</span>
            <input
              type="number"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              placeholder="e.g. 42"
            />
          </label>
          <button className="btn" onClick={handleDelete}>Delete</button>

          <label className="input-group">
            <span>Search</span>
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="e.g. 42"
            />
          </label>
          <button className="btn" onClick={handleSearch}>{isSearching ? 'Searching...' : 'Search'}</button>
        </div>

        <div className="control-row">
          <button className="btn" onClick={handleRandom}>Random tree</button>
          <button className="btn" onClick={handleClear}>Clear</button>
        </div>
      </div>

      <TreeVisualizer root={root} highlight={highlight} status={status} />
    </div>
  );
};

export default TreesPage;
