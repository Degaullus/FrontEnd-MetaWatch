import {createContext, useState, useEffect } from 'react'

const AuthContext = createContext()

function AuthContextProvider(props) {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log("storedToken", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}  
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;