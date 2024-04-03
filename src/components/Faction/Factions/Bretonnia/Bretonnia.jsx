import styles from "./Bretonnia.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Bretonnia() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Bretonnia</h2>
    </>
  );
}
