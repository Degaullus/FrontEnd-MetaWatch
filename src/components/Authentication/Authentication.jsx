import { useState, useEffect } from "react";
import styles from "./Authentication.module.css";

export default function Authentication () { 
    
    const [auth, setAuth] = useState("login");

    const handleAuth = () => {
        if (auth === "login") {
            setAuth("signup")
        } else {
            setAuth("login")
        }
    }

    useEffect(() => {
        handleAuth()
    }, [])

    return (
        <>
            <div>
                <h1>{auth}</h1>
                <button onClick={handleAuth}>Switch</button>
            </div>
        </>
    )
    }
