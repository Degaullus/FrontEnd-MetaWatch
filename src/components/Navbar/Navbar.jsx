import React from "react";
import { NavLink } from "react-router-dom"; 
import styles from "./Navbar.module.css";

export default function Navbar() { 
    return (
        <nav className={styles.navbarContainer}>
            <ul>
                <li className={styles.liNavbar}>
                    <NavLink to="/" activeClassName={styles.active} ><img className={styles.oldWorldLogo} src="public/TheOldWorldLogo.png" alt="logoOldworld" /></NavLink>
                </li>
                <li className={styles.liNavbar}>
                    <NavLink to="/" activeClassName={styles.active} >Homepage</NavLink>
                </li>
                <li className={styles.liNavbar}>
                    <NavLink to="/faction" activeClassName={styles.active} >Faction</NavLink>
                </li>
                <li className={styles.liNavbar}>
                    <NavLink to="/format" activeClassName={styles.active} >Format</NavLink>
                </li >
                <li className={styles.liNavbar}>
                    <NavLink to="/location" activeClassName={styles.active} >Location</NavLink>
                </li>
                <li >
                    <div className="styles.searchBar">
                    <input type="text" name="" id="" placeholder="Searchbar" activeClassName={styles.active} />
                    <button>Search</button>
                    </div>
                </li>
                <li>
                    <button> <NavLink to="/authentication" activeClassName={styles.active} >Login</NavLink></button>
                </li>
            </ul>
        </nav>
    );
}