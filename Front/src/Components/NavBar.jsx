import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/ReactContext';
import '../Styles/NavBar.css';

export const NavBar = () => {
  const { currentUser, logoutUser} = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">PetShop</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>



        {currentUser ? (
          currentUser.Range ? (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/products">Administrar Productos</Link>
              <Link to="/admin/users">Usuarios</Link>
              <button onClick={logoutUser}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/product/seeder">Productos</Link>
              <Link to="/profile">Mi Perfil</Link>
              <Link to="/cart" className="cart-link">🛒 Carrito</Link>
              <button onClick={logoutUser}>Cerrar Sesión</button>
            </>
          )
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
