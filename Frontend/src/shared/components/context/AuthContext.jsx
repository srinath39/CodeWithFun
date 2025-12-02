import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // useEffect(() => {
  //   // check the token is valid or not 
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/user/verify-token`, {
  //         withCredentials: true,
  //       });
  //       setIsAuthenticated(response.status === 200);
  //     } catch (err) {
  //       // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
  //       console.log(err.message);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(!(response.status === 200));
    } catch (err) {
      // Handle 4XX and 5XX errors in Fronted ( Create seperate UI for these)
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
