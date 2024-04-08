import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSizeContext();

  const isMobile = width < 768;

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <img src="/hamburger.svg" alt="Menu" />
      </div>
      <ul className={`${styles.ulNavbar} ${isMobile && isOpen ? styles.show : ''}`}>
        <li className={styles.liNavbar}>
          <NavLink to="/">
            <img
              className={styles.oldWorldLogo}
              src="/TheOldWorldLogo.png"
              alt="logoOldworld"
            />
          </NavLink>
        </li>
        <li className={styles.liNavbar}>
          <NavLink
            to="/"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Homepage
          </NavLink>
        </li>
        <li className={styles.liNavbar}>
          <NavLink
            to="/faction"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Faction
          </NavLink>
        </li>
        <li className={styles.liNavbar}>
          <NavLink
            to="/format"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Format
          </NavLink>
        </li>
        <li className={styles.liNavbar}>
          <NavLink
            to="/location"
            style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
          >
            Location
          </NavLink>
        </li>
        <li>
          <div className="styles.searchBar">
            <input type="text" name="" id="" placeholder="Searchbar" />
            <button>Search</button>
          </div>
        </li>
        <li>
          <button>
            <NavLink
              to="/authentication"
              style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
            >
              Login
            </NavLink>
          </button>
        </li>
      </ul>
    </nav>
  );
}
