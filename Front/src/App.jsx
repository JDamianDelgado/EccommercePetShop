import { NavBar } from "./Components/NavBar";
import { Footer } from "./Components/Footer";
import { Home } from "./Views/Home";
import { Productos } from "./Views/Products";
import { Login } from "./Views/Login";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Productos" element={<Productos />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
};

export default App;
