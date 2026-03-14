import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/Auth.css";
import { UserContext } from "../Context/ReactContext";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
          icon: "success",
          title: "Bienvenido!",
          text: "Inicio de sesi�n exitoso",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credenciales incorrectas",
        });
      }
    } catch (error) {
      console.error(
        "Error en el login:",
        error.response?.data?.message || error,
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo iniciar sesi�n",
      });
    }
  };

  return (
    <div className="auth-container">
      {/* <div className="auth-cat-wrap" aria-hidden="true">
        <img
          className="auth-cat"
          src="https://static.vecteezy.com/system/resources/previews/057/174/210/non_2x/curious-cat-peeking-over-a-transparent-table-against-a-soft-transparent-background-in-a-cheerful-and-playful-atmosphere-cat-peeking-over-transparent-top-table-transparent-background-free-png.png"
          alt=""
        />
        <span className="auth-cat-paw"></span>
        <span className="auth-cat-spark"></span>
      </div> */}
      <div className="auth-card">
        <h2>Iniciar Sesion</h2>
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
            <label htmlFor="password">Contrasena</label>
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
            Iniciar Sesion
          </button>
        </form>
        <p className="auth-link">
          No tienes cuenta?{" "}
          <span onClick={() => navigate("/register")} className="link">
            Registrate aqui
          </span>
        </p>
      </div>
    </div>
  );
};
