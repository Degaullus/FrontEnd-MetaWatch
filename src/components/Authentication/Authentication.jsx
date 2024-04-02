import styles from "./Authentication.module.css";

export default function Authentication () { 


    return (
        <>
        <h2 className={styles.heading}>Authentication-Site</h2>
        <div className={styles.container}>
            <div className={styles.form}>
                <h3 className={styles.formHeading}>Login</h3>
                <form>
                    <input className={styles.input} type="text" placeholder="email" />
                    <input className={styles.input} type="password" placeholder="Password" />
                    <button className={styles.button}>Login</button>
                </form>
            </div>
            <div className={styles.form}>
                <h3 className={styles.formHeading}>Sign up</h3>
                <form>
                    <input className={styles.input} type="text" placeholder="email" />
                    <input className={styles.input} type="password" placeholder="Password" />
                    <button className={styles.button}>Sign up</button>
                </form>
            </div>
        </div>

        </>
    )
    }
