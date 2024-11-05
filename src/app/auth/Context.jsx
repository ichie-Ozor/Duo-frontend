// MyContext.js
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState({name:'Frank Edward'});
  const [token,setToken] = useState("")
  const [balance,setBalance] = useState(0)
    // useEffect(() => {
    //   const loadUserData = async () => {
    //     const savedUser = await AsyncStorage.getItem("user");
    //     const savedToken = await AsyncStorage.getItem("token");
    //     if (savedUser && savedToken) {
    //       setUser(JSON.parse(savedUser));
    //       setToken(savedToken);
    //     }
    //   };

    //   loadUserData();
    // }, []);

    // const login = async (userData, userToken) => {
    //   setUser(userData);
    //   setToken(userToken);
    //   await AsyncStorage.setItem("user", JSON.stringify(userData));
    //   await AsyncStorage.setItem("token", userToken);
    // };

    // const logout = async () => {
    //   setUser(null);
    //   setToken(null);
    //   await AsyncStorage.removeItem("user");
    //   await AsyncStorage.removeItem("token");
    // };


  return (
    <AuthContext.Provider value={{ user, setUser,token,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { Provider, AuthContext };
