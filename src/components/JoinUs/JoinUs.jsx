import style from "./JoinUs.module.css";

export default function JoinUs() {
  return (
    <div className={style.JoinusContainer}>
      <h2>Join us</h2>
      <p>
        MetaHammer is still in Beta and need your help. Please report bugs or
        missing tournament results.
      </p>
      <a href="https://discord.gg/Vmwh48JDzZ">
        <img className={style.icon} src="/discord.svg" alt="Discord" />
      </a>
      <a href="https://www.instagram.com/metahammerofficial/">
        <img className={style.icon} src="/instagram.svg" alt="Instagram" />
      </a>
      <a className={style.mailTo} href="mailto:MetaHammer.contact@gmail.com">
        MetaHammer.contact@gmail.com
      </a>
    </div>
  );
}
