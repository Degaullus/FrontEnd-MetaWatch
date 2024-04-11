import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function useAuth () {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favCount, setFavCount] = useState(0);

  const login = (newToken, details = {}) => {
    setToken(newToken);
    setUsername(details.username);
    setEmail(details.email);
    setFavCount(details.favCount || 0);
    setFavorites(details.favorites || []);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', details.username);
    localStorage.setItem('email', details.email);
    localStorage.setItem('favCount', details.favCount || 0);
    localStorage.setItem('favorites', JSON.stringify(details.favorites || []));
  }

  const logout = () => {
    setToken(null);
    setUsername("");
    setEmail("");
    setFavCount(0);
    setFavorites([]);
    localStorage.clear();
    // localStorage.removeItem('token');
    // localStorage.removeItem('userDetails');
  };

  useEffect (() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedFavCount = parseInt(localStorage.getItem('favCount'), 10);
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));

    if (storedToken && storedEmail) {
      login(storedToken, { username: storedUsername, email: storedEmail, favCount: storedFavCount, favorites: storedFavorites });
    }
  }, [favCount]);


    const value = { token, username, email, favCount, favorites, login,logout};

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );

}

export default AuthContextProvider;