import { useState, useEffect } from "react";

// Assuming both stylesheets have similar keys for shared styles, 
// or consider merging them into one for simplification.
import styles from "./Auth.module.css"; 

export default function Auth({ onAuthenticate, setUser }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    if (isLogin) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const userObj = JSON.parse(userData);
        setStoredUser(userObj.email);
      }
    }
  }, [isLogin]);

  const handleAutoFill = async (e) => {
    e.preventDefault();
    setEmail(storedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const endpoint = isLogin ? "login" : "signup";
    
    const response = await fetch(`http://localhost:8080/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
      if (!isLogin) setEmail(""); 
      setPassword("");
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      if (isLogin) {
        onAuthenticate(email);
      } else {
        setUser(data);
        alert("User created. Please log in");
        setIsLogin(true); // Switch to login after successful signup
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear errors when toggling
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.title}>{isLogin ? "Login" : "Signup"}</h3>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Email:</label>
          <input
            className={`${styles.emailInput} ${styles.input}`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isLogin && storedUser && <button className={styles.autofill} onClick={handleAutoFill}>Auto-fill</button>}
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Password:</label>
          <input
            className={`${styles.passwordInput} ${styles.input}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.button} type="submit">{isLogin ? "Log in" : "Sign up"}</button>
        {error && <div className="error">{error}</div>}
        <button className={styles.toggle} onClick={toggleForm} type="button">
          {isLogin ? "Need an account? Sign up" : "Have an account? Log in"}
        </button>
      </form>
    </div>
  );
}
