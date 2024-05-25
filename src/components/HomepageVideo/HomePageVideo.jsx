import style from "./HomePageVideo.module.css";

export default function HomePageVideo() {
  return (
    <div className={style.videoContainer}>
      <video width="300" autoPlay loop muted>
        <source src="/introvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
