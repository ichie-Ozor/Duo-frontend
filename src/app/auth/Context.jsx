// MyContext.js
import { createContext, useState, useEffect } from "react";
import { server_url } from "@/lib/Helper";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(false);
  const _token = localStorage.getItem("@token");
  // useEffect(() => {
  //   const loadUserData = () => {
  //     const savedUser = localStorage.getItem("user");
  //     const savedToken = localStorage.getItem("token");
  //     if (savedUser && savedToken) {
  //       setUser(JSON.parse(savedUser));
  //       setToken(savedToken);
  //     }
  //   };

  //   loadUserData();
  // }, []);

  useEffect(() => {
    if (_token !== "") {
      fetch(`${server_url}/verify-token`, {
        method: "GET",
        headers: {
          authorization: _token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user);
            setToken(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // Fetch user data from API here
      // setUser(response.data);
    } else {
      window.location = "/";
    }
  }, [_token]);

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
