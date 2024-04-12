import styles from "./FactionSelected.module.css";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { APIContext } from "../../context/APIContextProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function FactionSelected() {
  const [openModalId, setOpenModalId] = useState(null);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const { data, isLoading } = useContext(APIContext);
  const { id } = useParams();
  const [points, setPoints] = useState(0);

  const formatRank = (rank) => {
    const suffixes = ["st", "nd", "rd", "th"];
    const mod10 = rank % 10;
    const mod100 = rank % 100;
    if (mod100 === 11 || mod100 === 12 || mod100 === 13) {
      return `${rank}${suffixes[3]}`;
    }
    const rankWithoutZero = parseInt(rank.toString().slice(1), 10) || rank;
    return `${rankWithoutZero}${suffixes[mod10 - 1]}`;
  };

  let filteredData = data?.filter(entry => {
    const entryPoints = parseInt(entry.format, 10); // Assuming entry.format is a string that can be converted to a number
    if (selectedTournament) {
      return entry.tournament === selectedTournament;
    } else {
      const armyCondition = entry.army.indexOf(id.replaceAll("-", " ")) !== -1;
      return points > 0 ? armyCondition && entryPoints === points : armyCondition;
    }
  });
  

  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2.getTime() - date1.getTime();
  });

  return (
    <>
      <h2>{`Welcome to ${id.replace(/-/g, " ")}`}</h2>
      <div>
        <button onClick={() => setPoints(2250)}>2250 Points</button>
        <button onClick={() => setPoints(2000)}>2000 Points</button>
        <button onClick={() => setPoints(1750)}>1750 Points</button>
        <button onClick={() => setPoints(1500)}>1500 Points</button>
        <button onClick={() => setPoints(1250)}>1250 Points</button>
        <button onClick={() => setPoints(1000)}>1000 Points</button>
        <button onClick={() => { setPoints(0); setSelectedTournament(null); }}>Reset filters</button>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.tournamentContainer}>
            {filteredData?.length > 0 ? filteredData.map((entry, index) => (
              <li key={index} className={styles.card}>
                <p className={styles.daten}>{formatRank(entry.rank)}</p>
                <p className={styles.daten}>{entry.format} pts</p>
                <p className={styles.daten} onClick={() => setSelectedTournament(entry.tournament)} style={{cursor: "pointer", textDecoration: "underline"}}>
                  "{entry.tournament}"
                </p>
                <p className={styles.daten}>{entry.location}</p>
                <p className={styles.daten} style={{ fontStyle: "italic" }}>{entry.date}</p>
                <button
                  type="button"
                  onClick={() => setOpenModalId(index)}
                  className="btn btn-primary"
                >
                  Show army list
                </button>
              </li>
            )) : <p>{`No data found with the selected filters.`}</p>}
          </div>
        </>
      )}

      {selectedTournament && (
        <button onClick={() => setSelectedTournament(null)}>Clear tournament filter</button>
      )}
    </>
  );
}
