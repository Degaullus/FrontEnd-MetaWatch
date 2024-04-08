import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.css";

export default function Authentication() {
    const [auth, setAuth] = useState("login");
    const [autoLogin, setAutoLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const getLocalStorage = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.email && userData.token) {
            setAutoLogin(true);
        }
    };

    const handleAutoLogin = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.email && userData.token) {
            setEmail(userData.email);
            setPassword(userData.token);
        }
    };

    useEffect(() => {
        getLocalStorage();
    }, []);

    const handleAuth = () => {
        setAuth((prevAuth) => (prevAuth === "login" ? "signup" : "login"));
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        const url = `http://localhost:8080/${auth}`; // Determines the endpoint based on the auth state
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, favorites: []}),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Success:', data);
                navigate('/');
                
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error.message);
            
        }
    };

    return (        
    <>
        <div className={styles.container}>
            <h1 className={styles.heading}>{auth}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className={styles.submitButton}>
                    {auth === "login" ? "Log In" : "Sign Up"}
                </button>
            </form>
            {autoLogin === true && auth === "login" && <button className={styles.buttonAutoLogin} onClick={handleAutoLogin}>Auto Login</button>}
            <button className={styles.switchButton} onClick={handleAuth}>Switch</button>
        </div>
    </>
    );
}
