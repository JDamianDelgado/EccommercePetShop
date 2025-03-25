import '../Styles/Footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact">
          <h3>Contacto</h3>
          <p><i className="fas fa-map-marker-alt"></i> Av. Siempre Viva 123</p>
          <p><i className="fas fa-phone-alt"></i> +123 456 789</p>
          <p><i className="fas fa-envelope"></i> example@petshop.com</p>
        </div>
        <div className="footer-section links">
          <h3>Enlaces</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product/seeder">Productos</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Síguenos</h3>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p> 2025 Petshop Demo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
