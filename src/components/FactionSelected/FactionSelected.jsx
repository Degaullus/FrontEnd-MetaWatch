import styles from "./FactionSelected.module.css";
import { useContext, useState } from "react"; //usestate for the popup
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../context/APIContextProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function FactionSelected() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useContext(APIContext);
  const { id } = useParams();
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();
  const [listCopied, setListCopied] = useState(false); // State variable to track if list is copied
  console.log(isLoading);

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
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;
  });

  // Function to copy list to clipboard
  const copyListToClipboard = (list) => {
    navigator.clipboard.writeText(list);
    setListCopied(true);
    setTimeout(() => {
      setListCopied(false);
    }, 3000); // Reset copied state after 3 seconds
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        All Factions
      </button>
      <h2>{`Welcome to ${id.replace("-", " ").replace("-", " ")}`}</h2>
      <button className="btn btn-primary" onClick={() => setPoints(2250)}>
        2250 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(2000)}>
        2000 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(1750)}>
        1750 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(1500)}>
        1500 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(1250)}>
        1250 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(1000)}>
        1000 Points
      </button>
      <button className="btn btn-primary" onClick={() => setPoints(0)}>
        All tournaments
      </button>
      {isLoading ? (
        <div className="loading-container">
          <p>Loading... (may take up to 50 seconds)</p>
          <LoadingSpinner />
        </div>
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
                /*                 show={(openModalId === index).toString()} */
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
                    <button
                      type="button"
                      onClick={() => copyListToClipboard(entry.list)}
                      className="btn btn-primary"
                    >
                      {listCopied && openModalId === index
                        ? "Copied!"
                        : "Copy List"}
                    </button>
                    <button>Add to favorites</button>
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
