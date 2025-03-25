import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { Home } from "./Views/Home";
import { Productos } from "./Views/Products";
import LoginForm from "./Components/Auth/LoginForm";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <div>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/Productos" element={<Productos />}></Route>
        </Routes>
        <Footer></Footer>
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
