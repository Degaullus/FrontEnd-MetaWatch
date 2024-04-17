import FadeLoader from "react-spinners/FadeLoader";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.loader}>
      <FadeLoader className={styles.loaderComp} color="black" />
    </div>
  );
}
