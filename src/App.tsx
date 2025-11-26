import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SortingPage from './pages/SortingPage';
import PathfindingPage from './pages/PathfindingPage';
import TreesPage from './pages/TreesPage';

const App = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/pathfinding" element={<PathfindingPage />} />
          <Route path="/trees" element={<TreesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
