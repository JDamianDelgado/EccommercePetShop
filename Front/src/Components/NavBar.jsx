import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

export const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/Home" className='navbarItem'>Home</Link>
      <Link to="/Login" className='navbarItem'>Login</Link>
      <Link to="/Productos" className='navbarItem'>Productos</Link>
    </div>
  );
};
