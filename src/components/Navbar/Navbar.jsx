import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { AuthContext } from "../../context/authContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { device } = useWindowSizeContext();
  const isMobile = device === "mobile";
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { token, logout, username, favCount } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

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
        <div className={styles.navItem} onClick={() => handleNavigate("/")}>
          Homepage
        </div>
        <div className={styles.navItem} onClick={() => handleNavigate("/faction")}>
          Faction
        </div>
        <div className={styles.navItem} onClick={() => handleNavigate("/format")}>
          Format
        </div>
        <div className={styles.navItem} onClick={() => handleNavigate("/location")}>
          Location
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Searchbar" />
          <button>Search</button>
        </div>
        {token ? (
          <div className={styles.profileContainer}>
            <div className={styles.loggedInAs}>Logged in as: {username}</div>
            <div className={styles.favorites} onClick={() => handleNavigate("/favorites")}>
              {favCount}<img className={styles.favoriteImg} src="/favorite.svg" />
            </div>
            <div className={styles.logout} onClick={handleLogout}>Logout</div>
          </div>
        ) : (
          <div className={styles.navItem} onClick={() => handleNavigate("/authentication")}>Login</div>
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
