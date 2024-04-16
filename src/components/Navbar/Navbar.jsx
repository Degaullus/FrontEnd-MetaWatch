import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
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
            {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <img src="/hamburger.svg" alt="Menu" />
        </div>
      )}
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
        <div
          className={styles.navItem}
          onClick={() => handleNavigate("/faction")}
        >
          Faction
        </div>
        <div
          className={styles.navItem}
          onClick={() => handleNavigate("/format")}
        >
          Format
        </div>
        <div className={styles.searchBarContainer}><SearchBar /></div>
        </div>
        {token ? (
          <div className={styles.profileContainer}>
            <div className={styles.favorites} onClick={() => handleNavigate("/favorites")}>
              <div className={styles.loggedInAs}>
                <span className={styles.logged}></span>
                <span className={styles.inas}>{username}</span>
              </div>
              <div className={styles.favCount}>
                {favCount}
                <img className={styles.favoriteImg} src="/favorite.svg" alt="Favorites" />
              </div>
            </div>
            {!isMobile && (
              <div className={styles.logout} onClick={handleLogout}>Logout</div>
            )}
          </div>
        ) : (
          !isMobile ? (
            <div className={styles.loginContainer} onClick={() => handleNavigate("/authentication")}>
              Login
            </div>
          ) : (
            <div className={styles.profileContainer} onClick={() => handleNavigate("/authentication")}>
              <img className={styles.profileImg} src="/profile.svg" alt="Profile" />
            </div>
          )
        )}
      {isMobile && (
        <>
        <div className={styles.searchContainer} onClick={toggleMenu}>
          <img className={styles.searchIcon} src="/search.svg" alt="Search" />
        </div>
        </>
      )}
    </nav>
  );
}
