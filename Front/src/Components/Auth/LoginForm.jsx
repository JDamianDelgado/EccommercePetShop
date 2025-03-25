import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../Styles/Login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.state?.showRegister);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthday: '',
    address: '',
    country: '',
    city: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setIsLogin(!location.state?.showRegister);
  }, [location.state?.showRegister]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? parseInt(value) || '' : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:3000/auth/signin', {
          email: formData.email,
          password: formData.password
        });
        
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          toast.success('¡Inicio de sesión exitoso!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } else {
        const response = await axios.post('http://localhost:3000/auth/signup', formData);
        if (response.data) {
          toast.success('¡Registro exitoso! Redirigiendo al login...', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              email: '',
              password: '',
              name: '',
              birthday: '',
              address: '',
              country: '',
              city: '',
              phone: ''
            });
          }, 2000);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error en la operación';
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="login-box">
        <h2>{isLogin ? 'Iniciar sesión' : 'Crear una cuenta'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="birthday"
                  placeholder="Fecha de nacimiento"
                  value={formData.birthday}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="country"
                  placeholder="País"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  placeholder="Ciudad"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>

        <p className="toggle-form">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button onClick={() => {
            setIsLogin(!isLogin);
            setFormData({
              email: '',
              password: '',
              name: '',
              birthday: '',
              address: '',
              country: '',
              city: '',
              phone: ''
            });
            setError('');
            setSuccess('');
          }} className="toggle-btn">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
