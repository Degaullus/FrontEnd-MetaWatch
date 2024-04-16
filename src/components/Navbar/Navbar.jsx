import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useWindowSizeContext } from "../../context/WindowSizeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { device } = useWindowSizeContext();
  const isMobile = device === "mobile";
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [username, setUsername] = useState("");
  const [favCount, setFavCount] = useState(0);
  const backendURL = 'https://backend-metawatch.onrender.com/';
  const localURL = 'http://localhost:8080/';

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetchUserDetails(userId, token);
}, [token, username]);

useEffect(() => {
    const handleStorageChange = (e) => {
        if (e.key === 'token') {
            setToken(localStorage.getItem('token'));
        }
        if (e.key === 'userId' && localStorage.getItem('token')) {
            fetchUserDetails(localStorage.getItem('userId'), localStorage.getItem('token'));
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);

const fetchUserDetails = async (userId, token) => {
  if (userId && token) {
      try {
          const url = `${localURL}users/${userId}`;
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          console.log(data)
          setUsername(data.username);
          setFavCount(data.favCount);
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  }
};

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
};
  const handleClickOutside = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
};

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  const handleNavigate = (path) => {
    toggleMenu();
    navigate(path);
  };

  const navContainerClassNames = `${styles.navContainer} ${
    isMobile && isOpen ? styles.open : ""
  }`;

  return (
    <nav className={styles.navbarContainer} ref={navbarRef}>
      <div className={styles.logoContainer} onClick={() => handleNavigate("/")}>
        <img
          className={styles.oldWorldLogo}
          src="/TheOldWorldLogo.png"
          alt="logoOldworld"
        />
      </div>
      <div className={navContainerClassNames}>
        <div className={styles.navItem} onClick={() => handleNavigate("/")}>Homepage</div>
        <div className={styles.navItem} onClick={() => handleNavigate("/faction")}>Faction</div>
        <div className={styles.navItem} onClick={() => handleNavigate("/format")}>Format</div>
        <SearchBar />
        {token ? (
          <div className={styles.profileContainer}>
            <div className={styles.favorites} onClick={() => handleNavigate("/favorites")}>
              <div className={styles.loggedInAs}>
                <span className={styles.logged}></span>
                <span className={styles.inas}>{username}</span>
              </div>
              {favCount}
              <img className={styles.favoriteImg} src="/favorite.svg" />
            </div>
            <div className={styles.logout} onClick={handleLogout}>
              Logout
            </div>
          </div>
        ) : (
          <div
            className={styles.navItem}
            onClick={() => handleNavigate("/authentication")}
          >
            Login
          </div>
        )}
      </div>
      {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <img src="/hamburger.svg" alt="Menu" />
        </div>
      )}
    </nav>
  );
}
