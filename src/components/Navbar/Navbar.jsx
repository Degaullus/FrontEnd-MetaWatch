import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import { useJwt } from "react-jwt";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = false;
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  const { decodedToken } = useJwt(token);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
      document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className={styles.navbarContainer} ref={navbarRef}>
      <div className={styles.essentials}>
        <div className={styles.logoContainer} onClick={() => handleNavigate("/")}>
          <img className={styles.logoImg} src="/emblem.svg"alt="logoOldworld"/>
        </div>
        <div className={styles.hamburgerContainer} onClick={toggleMenu}>
          <img className={styles.hamburgerImg} src="/hamburger.svg" alt="Menu" />
        </div>
      </div>

      <div className={`${styles.navContainer} ${ isOpen ? styles.open : ""}`}>
        <div className={styles.navItem} onClick={() => handleNavigate("/")}>Homepage</div>
        <div className={styles.navItem} onClick={() => handleNavigate("/faction")}>Faction</div>
        <div className={styles.navItem} onClick={() => handleNavigate("/format")}>Format</div>
        <div className={styles.searchBarContainer}><SearchBar /></div>
      </div>
      <div className={styles.profileContainer}>
        {token ? (
          <div className={styles.profileContainer}>
            <div
              className={styles.favorites}
              onClick={() => handleNavigate("/favorites")}
            >
              <div className={styles.loggedInAs}>
                <span className={styles.logged}></span>
                <span className={styles.inas}>{decodedToken?.username}</span>
              </div>
              <img className={styles.favoriteImg} src="/favorite.svg" />
            </div>
            <div className={styles.logout} onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <div className={styles.loginContainer} onClick={() => handleNavigate("/authentication")}>Login</div>
          ) }
          </div>
        ) : (
          <>
            <div
              className={styles.navItem}
              onClick={() => handleNavigate("/login")}
            >
              Login
            </div>
            <div
              className={styles.navItem}
              onClick={() => handleNavigate("/signup")}
            >
              Signup
            </div>
          </>
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
