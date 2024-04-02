import styles from "./Faction.module.css";
import { useAPI } from "../../context/apiContext";

export default function Faction() { 

  const { data, isLoading } = useAPI();

// console.log(data.entries)

    return (
        <div>
            <h2>Faction</h2>
            {/* {!isLoading ? <p>{entries}</p> : <p>Loading...</p>} */}
        </div>
    );
    }
  