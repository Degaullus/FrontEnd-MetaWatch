import styles from "./Vampire.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Vampire() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Vampire</h2>
    </>
  );
}
