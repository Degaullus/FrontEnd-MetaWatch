import { useWindowSizeContext } from "../../context/WindowSizeContext";
import styles from "./Footer.module.css";

function Footer() {
  
  const facebookURL = "https://facebook.com";
  const discordURL = "https://discord.com";
  const instagramURL = "https://instagram.com";

  return (

    <footer className={styles.container}>
      <div className={styles.footerIcons}>
        <a href={facebookURL}><img className={styles.icon} src="/facebook.svg" alt="Facebook" /></a>
        <a href={discordURL}><img className={styles.icon} src="/discord.svg" alt="Discord" /></a>
        <a href={instagramURL}><img className={styles.icon} src="/instagram.svg" alt="Instagram" /></a>
      </div>
      <h6>Some rights reserved</h6>
    </footer>
  );
}

export default Footer;
