import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loaderCont}>
      <div className={styles.loaderContTwo}>
        <p>
          Tournament information loading..
          <br /> May take up to 50 seconds
        </p>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}
