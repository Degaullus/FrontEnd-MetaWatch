import styles from "./Elf.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Elf() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Elf</h2>
    </>
  );
}
