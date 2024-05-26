import style from "./JoinUs.module.css";

export default function JoinUs() {
  return (
    <div className={style.JoinusContainer}>
      <div className={style.title}>
        <h2 className={style.join}>Join us</h2>

        <a className={style.mailTo} href="mailto:MetaHammer.contact@gmail.com">
          metahammer.contact@gmail.com
        </a>
      </div>

      <p className={style.parag}>
        MetaHammer is still in Beta and needs your help. Please report bugs or
        missing tournament results.
      </p>
      <div className={style.social}>
        <a href="https://discord.gg/Vmwh48JDzZ">
          <img className={style.icon} src="/discord.svg" alt="Discord" />
        </a>
        <a href="https://www.instagram.com/metahammerofficial/">
          <img className={style.icon} src="/instagram.svg" alt="Instagram" />
        </a>
      </div>
    </div>
  );
}
