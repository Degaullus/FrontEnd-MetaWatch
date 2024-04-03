import styles from "./ChaosDwarf.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function ChaosDwarf() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to ChaosDwarf</h2>
    </>
  );
}
