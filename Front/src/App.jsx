import { Routes, Route } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Footer } from "./Components/Footer";
import { Home } from './Views/Home';
import { Productos } from './Views/Products';
import { Cart } from './Views/Cart';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Profile } from './Views/Profile';
import { Compra } from './Views/Compra';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Usuarios } from './Views/Admin/Usuarios';
import { ProductosAdmin } from './Views/Admin/Productos';
import { PedidosAdmin } from './Views/Admin/Pedidos';

function App() {
  return (
    <div className="app">
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path="/admin/pedidos" element={<PedidosAdmin />} />
          <Route path="/admin/products" element={<ProductosAdmin />} />
          <Route path="/admin/users" element={<Usuarios />} />
          <Route path="/Compra" element={<Compra />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/seeder" element={<Productos />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
