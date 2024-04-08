import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // Additional user details
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track authentication errors

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

  // Optionally, include methods for handling errors or refreshing tokens

  return (
    <AuthContext.Provider value={{ token, userDetails, isLoading, error, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
