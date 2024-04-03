import styles from "./WoodElf.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function WoodElf() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to WoodElf</h2>
    </>
  );
}
