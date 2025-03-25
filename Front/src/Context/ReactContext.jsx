import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
  currentUser: null,
  loginUser: async () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        data
      );
      if (response.data === 200) {
        setCurrentUser(response.data);
        return true;
      }
    } catch (error) {
      alert(error.response.data || error.message);
      return false;
    }
  };

  const logOut = () => {
    setCurrentUser(null);
    alert("Se cerro sesion");
    navigate("/Home");
  };
  const values = {
    currentUser,
    setCurrentUser,
    logOut,
    loginUser,
  };

  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <UserContext.Provider value={values}> {children}</UserContext.Provider>
  );
};
