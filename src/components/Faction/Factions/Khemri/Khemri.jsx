import styles from "./Khemri.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Khemri() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Khemri</h2>
    </>
  );
}
