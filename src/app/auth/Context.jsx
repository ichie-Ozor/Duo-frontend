// MyContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    const loadUserData = () => {
      const savedUser = localStorage.getItem("user");
      const savedToken = localStorage.getItem("token");
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    };

    loadUserData();
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ login, user, setUser, token, setToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
