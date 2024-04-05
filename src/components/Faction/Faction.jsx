import styles from "./Faction.module.css";
import { useNavigate } from "react-router-dom";

export default function Faction() {
  const factions = [
    "Beastmen",
    "Bretonnia",
    "Warriors-of-Chaos",
    "Chaos-Dwarfs",
    "Daemons-of-Chaos",
    "Dark-Elves",
    "Dwarfen-Mountain-Holds",
    "High-Elf",
    "Empire",
    "Khemri",
    "Lizardmen",
    "Ogre",
    "Orc",
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
            {faction.replaceAll("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
