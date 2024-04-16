import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Authentication.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("https://backend-metawatch.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsLoading(false);
      login(data.token);
    }
  };

  return isLoading ? (
    "Loading..."
  ) : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Log in</h1>
        <label>email: </label>
        <input
          className={styles.input}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>password: </label>
        <input
          className={styles.input}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit" className={styles.submitButton}>
          Log in
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
