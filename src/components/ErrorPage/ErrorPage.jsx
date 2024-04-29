import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import { useEffect } from "react";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  return (
    <>
      <div className={styles.warp}>
        <h1>Lost in the warp?</h1>
      </div>
    </>
  );
}
