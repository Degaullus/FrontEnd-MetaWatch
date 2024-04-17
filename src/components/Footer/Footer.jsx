import styles from "./Footer.module.css";

function Footer() {
  const discordURL = "https://discord.gg/Vmwh48JDzZ";
  const instagramURL = "https://www.instagram.com/metahammerofficial/";

  return (
    <footer className={styles.container}>
      <div className={styles.containerTop}>
        <div className={styles.footerSectionLinks}>
          <h5>Quick Links</h5>

          <a href="/about">About Us</a>

          <a href="/support">Support</a>
        </div>
        <div className={styles.footerSectionCont}>
          <h5>Contact</h5>

          <div className={styles.footerIcons}>
            <a href="https://discord.gg/Vmwh48JDzZ">
              <img className={styles.icon} src="/discord.svg" alt="Discord" />
            </a>
            <a href="https://www.instagram.com/metahammerofficial/">
              <img
                className={styles.icon}
                src="/instagram.svg"
                alt="Instagram"
              />
            </a>
          </div>
          <p className={styles.contactP}>
            metahammer.contact@gmail.com <br /> &copy; 2024 MetaHammer. All
            rights reserved.
          </p>
        </div>
        <div className={styles.footerSectionLinks}>
          <h5>Legal</h5>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
