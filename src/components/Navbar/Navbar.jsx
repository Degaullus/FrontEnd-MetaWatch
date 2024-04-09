import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { device } = useWindowSizeContext();
  const isMobile = device === "mobile";
  const navbarRef = useRef(null);
  const navigate = useNavigate();


  // Close the hamburger list when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [isOpen]);

  const handleNavigate = (path) => {
    toggleMenu();
    navigate(path);
  };


  // Open and close the hamburger list
  const toggleMenu = () => setIsOpen(prevState => !prevState);

  // Add the class open to the ulNavbar when the hamburger list is open
  const ulNavBarClassNames = `${styles.ulNavbar} ${isMobile && isOpen ? styles.open : ''}`;

  return (
    <nav className={styles.navbarContainer} ref={navbarRef}>
      <div className={styles.logoContainer} onClick = {toggleMenu}>
          <NavLink to="/">
            <img
              className={styles.oldWorldLogo}
              src="/TheOldWorldLogo.png"
              alt="logoOldworld"
            />
          </NavLink>
      </div>
      <ul className={ulNavBarClassNames}>
        <li className={styles.liNavbar} onClick={toggleMenu}>
          <NavLink
            className={styles.navLink}
            to="/"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Homepage
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={toggleMenu}>
          <NavLink
            className={styles.navLink}
            to="/faction"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Faction
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={toggleMenu}>
          <NavLink
            className={styles.navLink}
            to="/format"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Format
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={toggleMenu}>
          <NavLink
            className={styles.navLink}
            to="/location"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Location
          </NavLink>
        </li>
        <li>
          <div className={styles.searchBar} onClick={toggleMenu}>
            <input type="text" name="" id="" placeholder="Searchbar" />
            <button>Search</button>
          </div>
        </li>
        <li>
          <button onClick={toggleMenu}>
            <NavLink
              to="/authentication"
              style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
            >
              Login
            </NavLink>
          </button>
        </li>
      </ul>
      {device === "mobile" && <div className={styles.hamburger} onClick={toggleMenu}>
        <img src="/hamburger.svg" alt="Menu" />
      </div>}
    </nav>
  );
}
