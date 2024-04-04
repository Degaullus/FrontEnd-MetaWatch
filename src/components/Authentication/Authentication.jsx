import { useState, useEffect } from "react";
import styles from "./Authentication.module.css";

export default function Authentication() {
    const [auth, setAuth] = useState("login");
    const [autoLogin, setAutoLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getLocalStorage = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.email && userData.token) {
            setAutoLogin(true);
            console.log("Auto login is possible");
        }
    };

    const handleAutoLogin = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.email && userData.token) {
            setEmail(userData.email);
            setPassword(userData.token); // Assuming the password field is metaphorical for token in this context
            console.log("Auto login successful");
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
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Success:', data);
                // Handle success, like redirecting the user or showing a success message
            } else {
                throw new Error(data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle the error, e.g., by showing an error message to the user
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>{auth}</h1>
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
                {autoLogin && <button className={styles.buttonAutoLogin} onClick={handleAutoLogin}>Auto Login</button>}
                <button className={styles.switchButton} onClick={handleAuth}>Switch</button>
            </div>
        </>
    );
}
