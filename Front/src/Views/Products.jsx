import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios';
import '../Styles/Products.css';
import { toast } from "react-toastify";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/product');
        setProductos(response.data);
      } catch (err) {
        toast.error('Error al cargar los productos');
        console.error('Error:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }
console.log('Agregando producto al carrito:', productId);
    try {
      await axiosInstance.put(`/orders/cart/${user.IdUser}/addCart`, { productId, quantity: 1 });
      toast.success('Producto agregado al carrito');
    } catch (err) {
      console.error('Error:', err.response?.data?.message || err.message);
      toast.error('Error al agregar al carrito');
    }
  };

  if (loading) return <div className="products-container">Cargando productos...</div>;
  if (error) return <div className="products-container">{error}</div>;

  return (
    <div className="products-container">
      <h1>Productos</h1>
      <div className="products-grid">
        {productos.map((producto) => (
          <div key={producto.IdProduct} className="product-card">
            <img src={producto.image} alt={producto.name} className="product-image" />
            <h3>{producto.name}</h3>
            <p className="product-price">${producto.price}</p>
            <p className="product-stock">Stock: {producto.stock} unidades</p>
            <button onClick={() => addToCart(producto.IdProduct)} className="add-to-cart" disabled={producto.stock === 0}>
              {producto.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
