import styles from "./Dwarf.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Dwarf() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Dwarf</h2>
    </>
  );
}
