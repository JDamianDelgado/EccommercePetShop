import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios";
import "src/Styles/Admin/Pedidos-Adm.css"

export const PedidosAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [detailOrder, setDetailOrder] = useState(null)

  const loadOrders = async () => {
    try {
      const response = await axiosInstance.get("orders/allOrders");
      setOrders(response.data);
      toast.success("Órdenes cargadas correctamente");
    } catch (error) {
      console.error("Error al cargar las órdenes", error);
      toast.error("Error al cargar las órdenes");
    }
  };

  const deleteOrder = async (idOrder)=>{
    try{
      await axiosInstance.delete(`orders/${idOrder}`)
      setOrders((prev)=> prev.filter((order)=> order.idOrder !== idOrder))
      setShowDeleteConfirm(null)
      toast.success('Orden eliminada exitosamente')
      loadOrders();

    } catch(error) { console.error('Error al eliminar la order', error)
      toast.error('Error al eliminar la orden')
    }

  }

  const CompletedOrder = async (idOrder)=>{
    try{
      await axiosInstance.put(`orders/${idOrder}`, { status: 'completed' })
      toast.success('Orden completada ')
      loadOrders();

    } catch(error) { console.error('Error al completar la order', error)
      toast.error('Error al completar la orden')
    }
  }
  const DetailOrder = async (idOrder)=> {
    try{
      const response = await axiosInstance.get(`orders/${idOrder}`)
      setDetailOrder(response.data)

    } catch(error) { console.error('Error al cargar la order', error)
      toast.error('Error al cargar la orden')
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="pedidos-container">
      <h1 className="title">Pedidos</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No hay órdenes</p>
      ) : (
        orders.map((order) => (
          <div key={order.IdOrder} className={`order-card ${order.status === 'completed' ? 'completed' : ''}`}>
            <p><strong>ID:</strong> {order.IdOrder}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Usuario:</strong> {order.user?.name}</p>

            {order.orderDetail ? (
              <>
                <p><strong>Total:</strong> ${order.orderDetail.totalPrice}</p>
                <h4 className="products-title">Productos:</h4>
                {order.orderDetail.products.map((product) => (
                  <div key={product.IdProduct} className="product-card">
                    <p className="subtitle">{product.name}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Cantidad: {product.quantity}</p>
                  </div>
                ))}
              </>
            ) : (
              <p className="no-products">Esta orden no tiene productos</p>
            )}
            <button onClick={()=>DetailOrder(order.IdOrder)} className="btn-details">Ver detalles</button>
            <button onClick={()=> setShowDeleteConfirm(order.IdOrder)} className="btn-delete">Eliminar Pedido</button>
            {order.status !== 'completed' && (
            <button onClick={()=> CompletedOrder(order.IdOrder)} className="btn-confirm">Completar Pedido</button>
            )}
          </div>
        ))
      )}

      {showDeleteConfirm && (
        <div>
          <div className="delete-confirm">
            <h2>
              ¿Estás seguro de querer eliminar esta Order? 
            </h2>
            <button onClick={() => deleteOrder(showDeleteConfirm)} className="btn-delete">Eliminar</button>
            <button onClick={() => setShowDeleteConfirm(null)} className="btn-cancel">Cancelar</button>
          </div>
        </div>
      )}

      {detailOrder && (
        <div className="ModalDetalles">
<div className="details">
  <h2>Detalles del pedido</h2>
  <p>User: {detailOrder.user.name}</p>
  <p>Fecha: {new Date(detailOrder.date).toLocaleDateString()}</p>
  <p>Country: {detailOrder.user.country}</p>
  <p>City: {detailOrder.user.city}</p>
  <p>Direccion: {detailOrder.user.address}</p>
  <p>Estado: {detailOrder.status}</p>
  <p>Email: {detailOrder.user.email}</p>
</div>
<button onClick={()=> setDetailOrder(null)} className="btn-cancel">Salir</button>

        </div>
      )}
    </div>
  );
};