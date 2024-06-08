import React from "react";
import style from "./Banner.module.css";

export default function Banner() {
  return (
    <div className={style.banner}>
      <a href="https://www.forg3d.fr" rel="noopener noreferrer" target="_blank">
        {" "}
        <img
          className={style.bannerImg}
          src="/partenaryLogos/meta10.png"
          alt="bannerImg"
        />
      </a>
    </div>
  );
}
