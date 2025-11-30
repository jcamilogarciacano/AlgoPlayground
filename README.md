# AlgoPlayground – Algorithm Visualizer

Interactive React + TypeScript playground for exploring classic algorithms with approachable visuals.

## Features
- Sorting playground: Bubble Sort and Insertion Sort with step/auto playback and speed control.
- Pathfinding lab: BFS on a grid with walls, visited/path highlighting, and playback controls.
- Tree explorer: Binary Search Tree insert/delete/search with search path stepping and highlights.

## Tech Stack
- React 18, TypeScript, Vite
- React Router for page routing
- Lightweight, custom CSS styling

## Getting Started
1) Clone: `git clone https://github.com/your-username/AlgoPlayground.git && cd AlgoPlayground`
2) Install deps: `npm install`
3) Run dev server: `npm run dev` (open the shown localhost URL)
4) Production build: `npm run build`

## Project Structure
- `src/App.tsx` – routes and shell
- `src/pages/` – page-level experiences (Home, Sorting, Pathfinding, Trees)
- `src/components/` – reusable visualizers and layout pieces
- `src/algorithms/` – algorithm implementations (sorting, pathfinding, trees) with shared types
- `src/styles/globals.css` – global styling and component visuals

## Future Improvements
- Add more algorithms (e.g., Merge/Quick sorts, Dijkstra/A*, AVL/Red-Black trees).
- Richer animations, tooltips, and step annotations.
- Mobile layout refinements and accessibility passes.
- Test coverage for algorithm outputs and UI helpers.
