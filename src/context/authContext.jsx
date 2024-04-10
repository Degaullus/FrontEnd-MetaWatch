import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favCount, setFavCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newToken, details = {}) => {
    setToken(newToken);
    setEmail(details.email);
    setFavCount(details.favCount || 0);
    setFavorites(details.favorites || []);
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', details.email);
    localStorage.setItem('favCount', details.favCount || 0);
    localStorage.setItem('favorites', JSON.stringify(details.favorites || []));
  }

  const logout = () => {
    setToken(null);
    setEmail("");
    setFavCount(0);
    setFavorites([]);
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userDetails');
  };

  useEffect (() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    const storedFavCount = parseInt(localStorage.getItem('favCount'), 10);
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (storedToken && storedEmail) {
      login(storedToken, { email: storedEmail, favCount: storedFavCount, favorites: storedFavorites });
    }
    setIsLoading(false);
  }, [favCount]);


    const value = { token, email, favCount, favorites, login,logout};

    return (
      <AuthContext.Provider value={value}>
        {!isLoading && children}
      </AuthContext.Provider>
    );

}

export default AuthContextProvider;