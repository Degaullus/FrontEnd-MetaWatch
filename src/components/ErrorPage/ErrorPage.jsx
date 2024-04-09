import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.warp}>
        <h1>Lost in the warp?</h1>
      </div>
    </>
  );
}
