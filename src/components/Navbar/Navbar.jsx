import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { device } = useWindowSizeContext();
  const isMobile = device === "mobile";
  const navbarRef = useRef(null);


  // Close the hamburger list when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    }
  }, [isOpen]);


  // Open and close the hamburger list
  const toggleMenu = () => {setIsOpen(!isOpen);};

  // Close the hamburger list when clicking on a link
  const closeHamburgerList = () => {setIsOpen(!isOpen)}

  // Add the class open to the ulNavbar when the hamburger list is open
  const ulNavBarClassNames = `${styles.ulNavbar} ${isMobile && isOpen ? styles.open : ''}`;

  return (
    <nav className={styles.navbarContainer} ref={navbarRef}>
      <div className={styles.logoContainer} onClick = {closeHamburgerList}>
          <NavLink to="/">
            <img
              className={styles.oldWorldLogo}
              src="/TheOldWorldLogo.png"
              alt="logoOldworld"
            />
          </NavLink>
      </div>
      <ul className={ulNavBarClassNames}>
        <li className={styles.liNavbar} onClick={closeHamburgerList}>
          <NavLink
            className={styles.navLink}
            to="/"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Homepage
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={closeHamburgerList}>
          <NavLink
            className={styles.navLink}
            to="/faction"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Faction
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={closeHamburgerList}>
          <NavLink
            className={styles.navLink}
            to="/format"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Format
          </NavLink>
        </li>
        <li className={styles.liNavbar} onClick={closeHamburgerList}>
          <NavLink
            className={styles.navLink}
            to="/location"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Location
          </NavLink>
        </li>
        <li>
          <div className={styles.searchBar} onClick={closeHamburgerList}>
            <input type="text" name="" id="" placeholder="Searchbar" />
            <button>Search</button>
          </div>
        </li>
        <li>
          <button onClick={closeHamburgerList}>
            <NavLink
              className={styles.navLink}
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
