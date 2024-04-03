import styles from "./Lizardmen.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Lizardmen() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Lizardmen</h2>
    </>
  );
}
