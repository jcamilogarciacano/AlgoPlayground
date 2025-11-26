import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home">
      <section className="hero">
        <h1>AlgoPlayground</h1>
        <p>Visualize algorithms and data structures with interactive controls to see how they really work.</p>
        <div className="cta-row">
          <Link className="btn primary" to="/sorting">Start with Sorting</Link>
          <Link className="btn ghost" to="/pathfinding">Try Pathfinding</Link>
        </div>
      </section>

      <section className="card-grid">
        <Link to="/sorting" className="feature-card">
          <h3>Sorting Visualizer</h3>
          <p>Watch numbers move as Bubble Sort compares and swaps its way to an ordered array.</p>
        </Link>
        <Link to="/pathfinding" className="feature-card">
          <h3>Pathfinding Lab</h3>
          <p>Experiment with BFS, Dijkstra, and A* to see how paths are explored on a grid.</p>
        </Link>
        <Link to="/trees" className="feature-card">
          <h3>Tree Explorer</h3>
          <p>Interact with a basic BST playground and peek into traversal order.</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
