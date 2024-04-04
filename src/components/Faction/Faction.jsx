import styles from "./Faction.module.css";
import { useNavigate } from "react-router-dom";

export default function Faction() {
  const factions = [
    "Beastmen",
    "Bretonnia",
    "Chaos",
    "Chaos-Dwarf",
    "Dark-Elf",
    "Dwarf",
    "Elf",
    "Empire",
    "Khemri",
    "Lizardmen",
    "Ogre",
    "Orcs",
    "Skaven",
    "Vampire",
    "Wood-Elf",
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
