import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Authentication.module.css";
import { AuthContext } from "../../context/authContext";


export default function Authentication() {
    const { login } = useContext(AuthContext);
    const [auth, setAuth] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const url = `http://localhost:8080/${auth}`; 
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password, favorites}),
            });
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                login(data.token, { email: data.email, favCount: data.favCount, favorites: data.favorites});
                navigate('/');
                setError("");
            } else {
                throw new Error(data.message || 'An unexpected error occurred.'); //Backend error message
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
            setError('Failed to communicate with the server.'); // Set a generic error message for fetch errors
        }
    };

    const handleAuthSwitch = () => {
        setAuth((prevAuth) => (prevAuth === "login" ? "signup" : "login"));
        setEmail("");
        setPassword("");
        setFavorites([]);
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
            <button className={styles.switchButton} onClick={handleAuthSwitch}>Switch to {auth === "login" ? "Sign Up" : "Log In"}</button>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    </>
    );
}
