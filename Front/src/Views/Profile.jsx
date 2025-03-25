import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import '../Styles/Profile.css';

export const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/orders/user/${user.IdUser}`);
        setOrders(response.data);
      } catch (err) {
        setError('Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) {
    return <div className="profile-container">Cargando...</div>;
  }

  if (error) {
    return <div className="profile-container">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Mi Perfil</h2>
        <div className="user-info">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <div className="orders-section">
        <h3>Mis Pedidos</h3>
        {orders.length === 0 ? (
          <p>No tienes pedidos realizados</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.IdOrder} className="order-card">
                <div className="order-header">
                  <span>Pedido #{order.IdOrder}</span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-products">
                  {order.products.map((product) => (
                    <div key={product.IdProduct} className="order-product">
                      <img src={product.image} alt={product.name} />
                      <div className="product-details">
                        <p>{product.name}</p>
                        <p>Cantidad: {product.quantity}</p>
                        <p>Precio: ${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
