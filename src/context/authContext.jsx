import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    
    if (storedToken) {
      setToken(storedToken);
      setUserDetails(storedUserDetails || {});
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
    }
  }, [token, userDetails]);

  const login = (newToken, userDetails = {}) => {
    setToken(newToken);
    setUserDetails(userDetails);
    setError(null); // Clear any previous errors
  };

  const logout = () => {
    setToken(null);
    setUserDetails({});
    // Optionally, redirect the user to the login page or homepage
  };

  return (
    <AuthContext.Provider value={{ token, userDetails, isLoading, error, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
