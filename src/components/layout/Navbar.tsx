import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">AlgoPlayground</div>
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
          Home
        </NavLink>
        <NavLink to="/sorting" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Sorting
        </NavLink>
        <NavLink to="/pathfinding" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Pathfinding
        </NavLink>
        <NavLink to="/trees" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Trees
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
