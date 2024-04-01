import React from "react";
import { NavLink } from "react-router-dom"; 
import styles from "./Navbar.module.css";

export default function Navbar() { 
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" activeclassname={styles.active} ><img src="public/TheOldWorldLogo.png" alt="logoOldworld" /></NavLink>
                </li>
                <li>
                    <NavLink to="/" activeclassname={styles.active} >Homepage</NavLink>
                </li>
                <li>
                    <NavLink to="/faction" activeclassname={styles.active} >Faction</NavLink>
                </li>
                <li>
                    <NavLink to="/format" activeclassname={styles.active} >Format</NavLink>
                </li>
                <li>
                    <NavLink to="/location" activeclassname={styles.active} >Location</NavLink>
                </li>
                <li>
                    <input type="text" name="" id="" placeholder="Searchbar" activeclassname={styles.active} />
                </li>
            </ul>
        </nav>
    );
}