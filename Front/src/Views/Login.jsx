import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import Swal from 'sweetalert2';
import '../Styles/Auth.css';
import { UserContext } from '../Context/ReactContext';

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
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido!',
          text: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Credenciales incorrectas',
        });
      }
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.message || error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo iniciar sesión',
      });
    }
  };

  return (
    <div className="auth-container">
      <img  className="auth-image-top" src="https://static.vecteezy.com/system/resources/previews/057/174/210/non_2x/curious-cat-peeking-over-a-transparent-table-against-a-soft-transparent-background-in-a-cheerful-and-playful-atmosphere-cat-peeking-over-transparent-top-table-transparent-background-free-png.png" alt="" />
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
      {/* <img src="https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-britiish-shorthair-cat-peeking-out-behind-wall-png-image_13030868.png" alt="" className='auth-image-left' /> */}
    </div>
  );
};
