import style from "./Partenary.module.css";

export default function Partenary() {
  return (
    <div className={style.partenary}>
      <h1 className={style.title}>Partenary</h1>
      <a
        className={style.logoBlock}
        href="https://championshub.app/user/help"
        target="_blank"
      >
        <img
          className={style.logos}
          src="/public/partenaryLogos/championshubLogo.png"
          alt="logoChamphub"
        />
      </a>
      <a
        className={style.logoBlock}
        href="https://www.youtube.com/@flat3damage"
        target="_blank"
      >
        <img
          className={style.logos}
          src="/public/partenaryLogos/flat3damageLogo.png"
          alt="F3D"
        />
      </a>
      <a
        className={style.logoBlock}
        href="https://www.youtube.com/channel/UClisI06Yyj1T12zVAZok9Ag"
        target="_blank"
      >
        <img
          className={style.logos}
          src="/public/partenaryLogos/nimpgameLogo.png"
          alt="NimpGame"
        />
      </a>
      <a
        className={style.logoBlock}
        href="https://www.youtube.com/@Warhamateur"
        target="_blank"
      >
        <img
          className={style.logos}
          src="/public/partenaryLogos/warhammerbyamateurLogo.png"
          alt="warhammerbyAmateur"
        />
      </a>
    </div>
  );
}
