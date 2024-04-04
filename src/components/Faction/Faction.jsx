import styles from "./Faction.module.css";
import { useNavigate } from "react-router-dom";

export default function Faction() {
  const factions = [
    "Beastmen",
    "Bretonnia",
    "Chaos",
    "Chaos-Dwarfs",
    "Dark-Elves",
    "Dwarf",
    "Elf",
    "Empire",
    "Khemri",
    "Lizardmen",
    "Ogre",
    "Orc",
    "Skaven",
    "Vampire",
    "Wood-Elves",
  ];

  const navigate = useNavigate();

  return (
    <div>
      <h2>Faction</h2>
      <div className={styles.buttonContainer}>
        {factions.map((faction) => (
          <button
            className={styles.button}
            onClick={() => navigate(`/faction/factions/${faction}`)}
          >
            {faction.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
