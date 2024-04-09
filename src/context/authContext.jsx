import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const login = (newToken, details = {}) => {
    setToken(newToken);
    setUserDetails(details);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userDetails', JSON.stringify(details));
  }

  const logout = () => {
    setToken(null);
    setUserDetails({});
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userDetails');
  };

  useEffect (() => {
    const storedToken = localStorage.getItem('token');
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedToken && storedUserDetails) {
      login(storedToken, storedUserDetails);
    }

    setIsLoading(false);
  }, []);


    const value = { token, userDetails, login,logout};

    return (
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    );

}

export default AuthContextProvider;