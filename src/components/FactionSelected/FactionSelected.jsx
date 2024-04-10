import styles from "./FactionSelected.module.css";
import { useAPI } from "../../context/apiContext";
import { useEffect, useState } from "react"; //usestate for the popup
import { useParams } from "react-router";

export default function FactionSelected() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useAPI();
  const { id } = useParams();
  const [points, setPoints] = useState(0);

  //format Ranks
  const formatRank = (rank) => {
    const suffixes = ["st", "nd", "rd", "th"];
    const mod10 = rank % 10;
    const mod100 = rank % 100;
    // Handle special cases
    if (mod100 === 11 || mod100 === 12 || mod100 === 13) {
      return `${rank}${suffixes[3]}`;
    }
    // Remove leading zero (if any)
    const rankWithoutZero = parseInt(rank.toString().slice(1), 10) || rank; // Handle single-digit ranks

    return `${rankWithoutZero}${suffixes[mod10 - 1]}`;
  };

  // this is filtering key="faction name"
  const filteredData =
    points == 0
      ? data?.filter(
          (entry) => entry.army.indexOf(id.replaceAll("-", " ")) !== -1
        )
      : data?.filter(
          (entry) =>
            entry.army.indexOf(id.replaceAll("-", " ")) !== -1 &&
            entry.format == points
        );

  // Sort filtered data by date (newest first)
  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2 - date1; // Descending order (newest first) (Gemini)
  });

  return (
    <>
      <h2>{`Welcome to ${id.replace("-", " ").replace("-", " ")}`}</h2>
      <button onClick={() => setPoints(2250)}>2250 Points</button>
      <button onClick={() => setPoints(2000)}>2000 Points</button>
      <button onClick={() => setPoints(1750)}>1750 Points</button>
      <button onClick={() => setPoints(1500)}>1500 Points</button>
      <button onClick={() => setPoints(1250)}>1250 Points</button>
      <button onClick={() => setPoints(1000)}>1000 Points</button>
      <button onClick={() => setPoints(0)}>All tournaments</button>
      {isLoading ? (
        <p>Loading data...</p>
      ) : filteredData?.length > 0 ? (
        <div className={styles.tournamentContainer}>
          {filteredData.map((entry, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.daten}>{formatRank(entry.rank)}</p>
              <p className={styles.daten}>{entry.format} pts </p>
              <p className={styles.daten}>"{entry.tournament}"</p>
              {/* spliting intro in array of words using space to delimite. Slice -2 select the 2 laste words, joins give them back into a string :) */}
              <p className={styles.daten}> {entry.location}</p>
              <p className={styles.daten} style={{ fontStyle: "italic" }}>
                {entry.date}
              </p>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target={"#listModal" + index}
                onClick={() => setOpenModalId(index)}
                className="btn btn-primary"
              >
                Show army list
              </button>
              <div
                className="modal"
                id={"listModal" + index}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="listModalLabel"
                aria-hidden="true"
                show={(openModalId === index).toString()}
              >
                <div
                  className="modal-dialog"
                  id={styles.modalDialogId}
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <pre>{entry.list}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      ) : (
        <p>{`No data found containing ${id} in the army name.`}</p>
      )}
    </>
  );
}
