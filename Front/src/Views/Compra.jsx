import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../config/axios';


export const Compra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const { orderDetails = [], totalPrice = 0, carrito } = location.state || {};

  const restart=async()=>{
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
      <h1 style={{ textAlign: "center", color: "red" }}>Compra Realizada con Éxito</h1>

      <h2 >Detalles de la Compra</h2>
      <div >
        {orderDetails.length > 0 ? (
          <ul >
            {orderDetails.map((item, index) => (
              <li style={{ margin: "10px", fontSize: "18px" }} key={index} >
                <strong>{item.name}</strong> - {item.quantity} x ${item.price.toFixed(2)} ={" "}
                <span >${item.total.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p >No hay productos en la orden.</p>
        )}
      </div>

      <h3 style={{ marginTop: "10px", fontSize: "28px", color:"green"}}>
        Total: <span>${totalPrice}</span>
      </h3>


<button onClick={() => restart()} style={{ margin: "75px", fontSize: "25px" , backgroundColor: "white", color: "Red", border: "none", cursor: "pointer"}}>Regresar al Inicio
</button>
      <p style={{ fontStyle: "italic", color: "#555", marginTop: "150px" }}>
        ⚠️ Recordemos que al ser una página de prueba, no se pueden realizar transacciones reales.
      </p>
    </div>
  );
};
