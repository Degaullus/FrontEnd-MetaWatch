import styles from "./Beastmen.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Beastmen() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Beastmen</h2>
    </>
  );
}
