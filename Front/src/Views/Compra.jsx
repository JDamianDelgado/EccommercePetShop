import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../config/axios';
import '../Styles/Compra.css';


export const Compra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { orderDetails = [], totalPrice = 0, carrito } = location.state || {};

  const restart = async () => {
    try {
      await axiosInstance.delete(`/orders/remover/${carrito}`);
      navigate('/');
      toast.success('Carrito eliminado');
    } catch (err) {
      console.error('Error:', err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || 'Error al eliminar el carrito');
    }
  }

  return (
    <div className="compra-container">
      <h1 className="compra-titulo">Compra Realizada con Éxito</h1>

      <h2 className="compra-subtitulo">Detalle de la Compra</h2>
      <div className="detalles-compra">
        {orderDetails.length > 0 ? (
          <ul>
            {orderDetails.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)} ={" "}
                <span>${item.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos en la orden.</p>
        )}
      </div>

      <h3 className="total-compra">
        Total: <span>${totalPrice}</span>
      </h3>

      <button onClick={restart} className="boton-regresar">
        Regresar al Inicio
      </button>

      <p className="aviso">
        ⚠️ Recordemos que al ser una página de prueba, no se pueden realizar transacciones reales.
      </p>
    </div>
  );
};