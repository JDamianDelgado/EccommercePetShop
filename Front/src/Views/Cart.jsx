import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import '../Styles/Cart.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      setError('Debes iniciar sesión para ver el carrito');
      setLoading(false);
      return;
    }

    loadCart(); 
  }, []);

  const loadCart = async () => {
    try {
      const response = await axiosInstance.get(`/orders/cart/${user.IdUser}`);
      const cartItems = response.data;
      const total = cartItems.reduce((sum, item) => 
        sum + (item.product.price * item.quantity), 0);
      
      setCart({
        cartItem: cartItems,
        total: total
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el carrito');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (idCartItem) => {

    try {
      await axiosInstance.delete(`/orders/cart/${user.IdUser}/${idCartItem}`);
  
      await loadCart(); 
      toast.success('Producto eliminado del carrito');
    } catch (err) {
      console.error('Error:', err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || 'Error al eliminar el producto');
    }
  };

  const updateQuantity = async (idCartItem, quantity) => {
    console.log('Actualizando cantidad para el producto:', idCartItem, 'Cantidad:', quantity);
    if (quantity < 1) {
      await removeFromCart(idCartItem);
      return;
    }

    try {
      console.log('Actualizando cantidad para el producto:', idCartItem, 'Cantidad:', quantity);
      await axiosInstance.patch(`/orders/cart/${user.IdUser}/${idCartItem}`, {
        quantity,       
      });
      await loadCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar la cantidad');
      console.error('Error:', err);
    }
  };

  const checkout = async () => {
    try {
      const response = await axiosInstance.post(`/orders/${user.IdUser}`);
      console.log('RESPONSE:', response.data);
      console.log('CARRITO:', response.data.carrito);
      navigate('/compra', { 
        state: { 
          orderDetails: response.data.orderDetail.products, 
          totalPrice: response.data.orderDetail.totalPrice,
         carrito: response.data.carrito
        } 
      });
  
      toast.success('Compra realizada con éxito');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la compra');
      console.error('Error:', err);
    }
  };

  if (!user) {
    return (
      <div className="cart-container">
        <p className="cart-error">Debes iniciar sesión para ver el carrito</p>
        <button onClick={() => navigate('/login')} className="login-button">
          Ir al Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-container">
        <p className="cart-loading">Cargando carrito...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container">
        <p className="cart-error">{error}</p>
      </div>
    );
  }

  if (!cart || !cart.cartItem || cart.cartItem.length <= 0) {
    return (
      <div className="cart-container">
        <p className="cart-empty">Tu carrito está vacío</p>
        <button onClick={() => navigate('/product/seeder')} className="continue-shopping">
          Seguir Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cart.cartItem.map((item) => (
          <div key={item.idCartItem} className="cart-item">
            <img
              className="cart-item-image"
              src={item.product.image}
              alt={item.product.name}
            />
            <div className="cart-item-details">
              <h3>{item.product.name}</h3>
              <p className="cart-item-price">
                Precio: ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.idCartItem, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.idCartItem, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(item.idCartItem)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">Total: ${cart.total.toFixed(2)}</p>
        <button className="checkout-button" onClick={checkout}>
  Finalizar Compra
</button>

        <button className="continue-shopping" onClick={() => navigate('/product/seeder')}>
          Seguir Comprando
        </button>
      </div>
    </div>
  );
};
