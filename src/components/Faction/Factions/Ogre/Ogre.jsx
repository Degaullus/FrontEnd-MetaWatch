import styles from "./Ogre.module.css";
import { useAPI } from "../../../../context/apiContext";

export default function Ogre() {
  const { data, isLoading } = useAPI();

  return (
    <>
      <h2>Welcome to Ogre</h2>
    </>
  );
}
