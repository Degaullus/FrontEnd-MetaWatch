import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.css";


export default function Authentication() {

    const navigate = useNavigate();

    const [auth, setAuth] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const backendURL = 'https://backend-metawatch.onrender.com/';
    const localURL = 'http://localhost:8080/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${localURL}${auth}`;

        let payload;
        if (auth === "login") {
            payload = username
                ? { username, password }
                : { email, password };
        } else { 
            payload = { username, email, password };
        }

    try {
        // console.log('Sending Payload:', payload)
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log('Response:', response)
        if (response.ok) {
            // console.log('data ok:', data);
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/');
            setError("");
        } else {
            throw new Error(data.message || 'Error sending POST request in authentication component');
        }
        if (!response.ok) {
            const errorText = data.message || 'Authentication failed.';
            setError(errorText);
            console.error('Authentication error:', errorText);
        }

    } catch (error) {
        console.error('Fetch error:', error.message);
        setError('Failed to communicate with the server from the authentication component.');
    }
};

    const handleAuthSwitch = () => {
        setAuth((prevAuth) => (prevAuth === "login" ? "signup" : "login"));
        // setUsername("");
        setEmail("");
        setPassword("");
    };


    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.heading}>{auth}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        disabled={!!email && auth === "login"} // Disable if email is filled during login
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={!!username && auth === "login"} // Disable if username is filled during login
                    />
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.submitButton}>
                        {auth === "login" ? "Log In" : "Sign Up"}
                    </button>
                </form>
                <button className={styles.switchButton} onClick={handleAuthSwitch}>
                    Switch to {auth === "login" ? "Sign Up" : "Log In"}
                </button>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </>
    );
}