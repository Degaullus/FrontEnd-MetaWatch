import styles from "./Faction.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const factions = [
  { name: "Beastmen", image: "/factionsIcons/beastMen.jpg" },
  { name: "Bretonnia", image: "/factionsIcons/bretonnia.jpg" },
  {
    name: "Warriors of Chaos",
    image: "/factionsIcons/chaos.jpg",
  },
  { name: "Chaos Dwarfs", image: "/factionsIcons/chaosdwarfs.webp" },
  {
    name: "Daemons of Chaos",
    image: "/factionsIcons/demons.jpg",
  },
  { name: "Dark Elves", image: "/factionsIcons/darkelf.jpg" },
  {
    name: "Dwarfen Mountain Holds",
    image: "/factionsIcons/dwarf.jpg",
  },
  { name: "High Elf", image: "/factionsIcons/elfs.jpg" },
  { name: "Empire", image: "/factionsIcons/empire.jpg" },
  { name: "Khemri", image: "/factionsIcons/khemri.jpg" },
  { name: "Lizardmen", image: "/factionsIcons/lizardmen.jpg" },
  { name: "Ogre", image: "/factionsIcons/ogres.webp" },
  { name: "Orc", image: "/factionsIcons/orcs.jpg" },
  { name: "Skaven", image: "/factionsIcons/skavens.jpg" },
  { name: "Vampire Counts", image: "/factionsIcons/vampire.jpg" }, // Corrected name
  { name: "Wood Elf", image: "/factionsIcons/woodelf.jpg" },
];

export default function Faction() {
  const navigate = useNavigate();

  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  return (
    <div className={styles.factionBackground}>
      <div className={styles.divider1}></div>
      <div className={styles.factionHeadline}>
        <h2>Choose your Faction</h2>
      </div>
      <div className={styles.divider1}></div>
      <div className={styles.emblem}>
        <img src="/emblem.svg" alt="MetaHammerLogo" />
      </div>
      <div className={styles.divider3}></div>
      <div className={styles.buttonContainer}>
        {factions.map((faction) => (
          <button
            className={styles.factionButtons}
            onClick={() => navigate(`/faction/${faction.name}`)}
            key={faction.name} /* here looks like a problem */
          >
            <div className={styles.factionName}> {faction.name}</div>
            <img
              className={styles.factionImage}
              src={faction.image}
              alt={faction.name + "faction logo"}
            />
          </button>
        ))}
      </div>
      <div className={styles.divider1}></div>
    </div>
  );
}
