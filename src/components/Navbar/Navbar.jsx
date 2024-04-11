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

  // Close the hamburger list when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {

      if (navbarRef.current && !navbarRef.current.contains(e.target)) {setIsOpen(false)}};
      if (isOpen) {document.addEventListener("mouseup", handleClickOutside)}
      return () => document.removeEventListener("mouseup", handleClickOutside)
    }, [isOpen, favCount]);

  // Open and close the hamburger list
  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  // Close the hamburger list and navigate to the path
  const handleNavigate = (path) => {
    toggleMenu();
    navigate(path);
  };

  // Add the class open to the ulNavbar when the hamburger list is open
  const ulNavBarClassNames = `${styles.ulNavbar} ${
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
      <ul className={ulNavBarClassNames}>
        <li className={styles.liNavbar} onClick={() => handleNavigate("/")}>
          Homepage
        </li>
        <li
          className={styles.liNavbar}
          onClick={() => handleNavigate("/faction")}
        >
          Faction
        </li>
        <li
          className={styles.liNavbar}
          onClick={() => handleNavigate("/format")}
        >
          Format
        </li>
        <li
          className={styles.liNavbar}
          onClick={() => handleNavigate("/location")}
        >
          Location
        </li>
        <li>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Searchbar" />
            <button>Search</button>
          </div>
        </li>
        {token ? (
          <>

            <li className={styles.liNavbar} onClick={handleLogout}>Logout</li>
            <li className={styles.loggedInAs}>logged in as: {username}</li>
            <li className={styles.liNavbar} onClick={() => handleNavigate("/favorites")}>{favCount}<img className={styles.favoriteImg}src="/favorite.svg" /></li>
          </>
        ) : (
        <>
          <li className={styles.liNavbar} onClick={() => handleNavigate("/authentication")}>Login</li>
          </>

        )}
      </ul>
      {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <img src="/hamburger.svg" alt="Menu" />
        </div>
      )}
    </nav>
  );
}
