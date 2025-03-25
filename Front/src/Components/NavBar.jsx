import { Link } from "react-router-dom";
import '../Styles/Navbar.css';

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="navbar-logo">
              <img
                className="logo-img"
                src="/logo.png"
                alt="PetShop"
              />
            </div>
            <div className="navbar-links">
              <div className="nav-links-group">
                <Link
                  to="/Home"
                  className="nav-link"
                >
                  Home
                </Link>
                <Link
                  to="/Productos"
                  className="nav-link"
                >
                  Productos
                </Link>
              </div>
            </div>
          </div>
          <div className="navbar-right">
            <div className="auth-links">
              <Link
                to="/login"
                className="nav-link"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/login"
                state={{ showRegister: true }}
                className="nav-link-primary"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
