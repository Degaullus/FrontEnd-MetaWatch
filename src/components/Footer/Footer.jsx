import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.container}>
      <h1>Follow Us</h1>
      <a
        target="_blank"
        className={styles.social}
        href="https://www.instagram.com/metahammerofficial/"
      >
        Instagram
      </a>
      <a target="_blank" href="https://discord.gg/8bStJGbd">
        Discord
      </a>
      <p>
        Contact{" "}
        <a target="_blank" href="metahammer.contact@gmail.com<">
          metahammer.contact@gmail.com
        </a>
      </p>
    </div>
  );
}

export default Footer;
