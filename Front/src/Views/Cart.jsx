import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import '../Styles/Cart.css';

export const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener el usuario del localStorage
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
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el carrito');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete('/orders/cart/remove', {
        data: { orderId: cart.IdOrder, productId },
      });
      await loadCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar el producto');
      console.error('Error:', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      await axiosInstance.post('/orders/cart/add', {
        orderId: cart.IdOrder,
        productId,
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
      await axiosInstance.post(`/orders/cart/checkout/${cart.IdOrder}`);
      setCart(null);
      navigate('/orders/success');
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

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="cart-container">
        <p className="cart-empty">Tu carrito está vacío</p>
        <button onClick={() => navigate('/')} className="continue-shopping">
          Seguir Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      <div className="cart-items">
        {cart.products.map((product) => (
          <div key={product.IdProduct} className="cart-item">
            <img
              className="cart-item-image"
              src={product.image}
              alt={product.name}
            />
            <div className="cart-item-details">
              <h3>{product.name}</h3>
              <p className="cart-item-price">
                Precio: ${(product.price * product.quantity).toFixed(2)}
              </p>
              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    updateQuantity(product.IdProduct, product.quantity - 1)
                  }
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(product.IdProduct, product.quantity + 1)
                  }
                  disabled={product.quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(product.IdProduct)}
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
        <button className="continue-shopping" onClick={() => navigate('/')}>
          Seguir Comprando
        </button>
      </div>
    </div>
  );
};
