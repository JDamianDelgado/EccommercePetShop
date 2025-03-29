import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/ReactContext';
import '../Styles/NavBar.css';

export const NavBar = () => {
  const { currentUser, logoutUser} = useContext(UserContext);
console.log('currentUser en NavBar', currentUser);
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">PetShop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/product/seeder">Productos</Link>
        {currentUser ? (
          <>
          <Link to="/profile">Mi Perfil</Link>
          <Link to="/cart" className="cart-link">
            🛒 Carrito
          </Link>
          <button onClick={logoutUser}>Cerrar Sesión</button>
        </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};
