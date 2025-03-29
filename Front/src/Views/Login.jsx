import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import '../Styles/Auth.css';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/ReactContext';
import { useContext } from 'react';


export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginSuccess = await loginUser(formData);
      if (loginSuccess) {
        toast.success("Inicio de sesión exitoso");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.message || error);
      toast.error("No se pudo iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="auth-link">
          ¿No tienes cuenta?{' '}
          <span onClick={() => navigate('/register')} className="link">
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};
