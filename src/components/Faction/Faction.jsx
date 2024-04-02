import styles from "./Faction.module.css";
import { useAPI } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";

export default function Faction() { 

  const { data, isLoading } = useAPI();

  const navigate = useNavigate();


    return (
        <div>
            <h2>Faction</h2>
  <div>
  <button className={styles.button} onClick={() => navigate("/faction/factions/empire")}>Empire</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/chaos")}>Chaos</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/orcs")}>Orcs</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/ogre")}>Ogre</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/khemri")}>Khemri</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/dwarf")}>Dwarf</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/elf")}>Elf</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/woodelf")}>Wood Elf</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/darkelf")}>Dark Elf</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/chaosdwarf")}>Chaos Dwarves</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/lizardmen")}>Lizardmen</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/vampire")}>Vampires</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/bretonnia")}>Bretonnia</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/skaven")}>Skaven</button>
  <button className={styles.button} onClick={() => navigate("/faction/factions/beastmen")}>Beastmen</button>
  </div>

             {!isLoading ? data.entries.map((entry) => (
                <div key={entry.id} className={styles.card}>
                    <h3>{entry.army}</h3>
                    <p>{entry.date}</p>
                    <p>{entry.rank}</p>
                </div>
            )) : <p>Loading...</p>} 
        </div>
    );
    }
  