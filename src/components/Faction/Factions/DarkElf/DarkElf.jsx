import styles from "./DarkElf.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function DarkElf() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to DarkElf</h2>
    </>
  );
}
