import styles from "./Skaven.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Skaven() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Skaven</h2>
    </>
  );
}
