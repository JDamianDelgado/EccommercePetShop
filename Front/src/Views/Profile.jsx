import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import '../Styles/Profile.css';
import { toast } from 'react-toastify';

export const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [editProfile, setEditProfile] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleChange = (field, value) => {
    setEditUser(prev => ({
      ...prev,
      [field]: value,
    }));
  }

  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(`/user/${user.IdUser}`, editUser);
      toast.success('Perfil actualizado correctamente');
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setEditProfile(false);
    } catch (err) {
      console.error('Error al actualizar perfil', err);
      toast.error('Error al actualizar perfil');
    }
  }

  const cancelarEdit = () => {
    setEditProfile(false);
    setEditUser({});
  }

  const cancelarOrder = async (idOrder) => {
    try {
      await axiosInstance.put(`orders/${idOrder}`, { status: 'cancelled' })
      loadOrders();
      toast.success('Orden cancelada exitosamente')
    } catch (err) {
      console.error('Error al cancelar la order', err)
      toast.error('Error al cancelar la orden')
    }
  }

  const eliminarOrden = async (IdOrder)=>{
    try{
      await axiosInstance.delete(`orders/${IdOrder}`)
      toast.success('Orden eliminada exitosamente')
      loadOrders();

    } catch(error) { console.error('Error al eliminar la order', error)
      toast.error('Error al eliminar la orden')
    }
  }


  const loadOrders = async () => {
    try {
      const response = await axiosInstance.get(`/orders/myOrders/${user.IdUser}`);
      
  
      const orderedOrders = response.data.sort((a, b) => {
        const statusPriority = {
          pending: 1,
          completed: 2,
          cancelled: 3
        };
      
        return statusPriority[a.status] - statusPriority[b.status];
      });
      
      setOrders(orderedOrders);
    } catch (err) {
      setError('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [navigate]);

  if (loading) return <div className="profile-container">Cargando...</div>;
  if (error) return <div className="profile-container">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Mi Perfil</h2>

        {editProfile ? (
          <>
            <div className="user-info">
              <input value={editUser.name || ''} onChange={(e) => handleChange('name', e.target.value)} placeholder='Nombre' />
              <input value={editUser.email || ''} onChange={(e) => handleChange('email', e.target.value)} placeholder='Email' />
              <input value={editUser.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} placeholder='Teléfono' />
              <input value={editUser.address || ''} onChange={(e) => handleChange('address', e.target.value)} placeholder='Dirección' />
              <input value={editUser.numberDirect || ''} onChange={(e) => handleChange('numberDirect', e.target.value)} placeholder='Número de domicilio' />
              <input value={editUser.ZipCode || ''} onChange={(e) => handleChange('ZipCode', e.target.value)} placeholder='Código postal' />
              <input value={editUser.city || ''} onChange={(e) => handleChange('city', e.target.value)} placeholder='Ciudad' />
              <input value={editUser.province || ''} onChange={(e) => handleChange('province', e.target.value)} placeholder='Provincia' />
              <input value={editUser.country || ''} onChange={(e) => handleChange('country', e.target.value)} placeholder='País' />
              <input value={editUser.birthday?.split('T')[0] || ''} onChange={(e) => handleChange('birthday', e.target.value)} placeholder='Fecha de nacimiento' />
            </div>

            <button onClick={handleSaveEdit}>Guardar</button>
            <button onClick={cancelarEdit}>Cancelar</button>
          </>
        ) : (
          <>
            <div className="user-info">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.phone}</p>
              <p><strong>Dirección:</strong> {user.address}</p>
              <p><strong>N°:</strong> {user.numberDirect}</p>
              <p><strong>Código postal:</strong> {user.ZipCode}</p>
              <p><strong>Ciudad:</strong> {user.city}</p>
              <p><strong>Provincia:</strong> {user.province}</p>
              <p><strong>País:</strong> {user.country}</p>
              <p><strong>Fecha de nacimiento:</strong> {new Date(user.birthday).toISOString().split('T')[0]}</p>
            </div>

            <button onClick={() => {
              setEditProfile(true);
              setEditUser({ ...user });
            }}>
              Editar Perfil
            </button>
          </>
        )}
      </div>

      <div className="orders-section">
        <h3>Mis Pedidos</h3>
        {orders.length === 0 ? (
          <p>No tienes pedidos realizados</p>
        ) : (
          orders.map((order) => 
            (
            <div
  key={order.IdOrder}
  className={`order-card ${
    order.status === 'pending'
      ? 'pending'
      : order.status === 'completed'
      ? 'completed'
      : order.status === 'cancelled'
      ? 'cancelled'
      : ''
  }`}>
              <div className="order-header">
                <span>Pedido N° : {order.IdOrder}</span>
                <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}</span>
              </div>

              <div className="order-products">
                {order.orderDetail.products.map((product) => (
                  <div key={product.IdProduct} className="order-product">
                    <img className='order-product-img' src={product.image} alt={product.name} />
                    <div className="product-details">
                      <p>{product.name}</p>
                      <p>Cantidad: {product.quantity}</p>
                      <p>Precio: ${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                Total: ${order.orderDetail.totalPrice}
              </div>

              {order.status === 'pending' && (
                <button className='btn-cancelar' onClick={() => cancelarOrder(order.IdOrder)}>
                  Cancelar orden
                </button>
              )}
              {order.status !== 'pending' && (
                <button className='btn-cancelar' onClick={() => setShowDeleteConfirm(order.IdOrder)}>
                  Eliminar orden
                </button>
              )}
            </div>
          ))
        )}
      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>¿Estás seguro de eliminar esta orden?</p>
          <button onClick={() => {eliminarOrden(showDeleteConfirm); setShowDeleteConfirm(null)}}>Eliminar</button>
          <button onClick={() => setShowDeleteConfirm(null)}>Cancelar</button>
        </div>
      )}  
      </div>
    </div>
  );
};


