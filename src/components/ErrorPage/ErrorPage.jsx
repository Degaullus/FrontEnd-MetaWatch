import {useNavigate} from "react-router-dom";
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
        <img 
          className={styles.image}
          src="images/sadFigure.svg" 
          alt="sad figure" 
          onClick={handleClick}
        />
      </div>
    </>
  );
}
