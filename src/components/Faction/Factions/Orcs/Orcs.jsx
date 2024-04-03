import styles from "./Orcs.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Orcs() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Orcs</h2>
    </>
  );
}
