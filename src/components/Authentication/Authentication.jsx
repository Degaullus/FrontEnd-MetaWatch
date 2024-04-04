import { useState, useEffect } from "react";
import styles from "./Authentication.module.css";

export default function Authentication () { 
    
    const [auth, setAuth] = useState("login");
  


    const handleAuth = () => {
        if (auth === "login") {
            setAuth("signup")
            console.log("Currently displaying signup")
        } else {
            console.log("Currently displaying login")
            setAuth("login")
        }
    }

    useEffect(() => {
        handleAuth();
    }, [])

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>{auth}</h1>
                <input className={styles.input} type="text" placeholder="email" />
                <input className={styles.input} type="password" placeholder="password" />
                <button className={styles.switchButton} onClick={handleAuth}>Switch</button>
            </div>
        </>
    )
    }
