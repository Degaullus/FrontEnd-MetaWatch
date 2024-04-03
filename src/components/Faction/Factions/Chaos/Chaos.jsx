import styles from "./Chaos.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Chaos() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to chaos</h2>
    </>
  );
}
