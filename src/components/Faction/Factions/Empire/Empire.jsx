import styles from "./Empire.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Empire() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Empire</h2>
    </>
  );
}
