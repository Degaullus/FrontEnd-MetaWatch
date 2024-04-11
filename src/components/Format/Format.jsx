import styles from "./Format.module.css";
import { useContext, useState } from "react";
import { APIContext } from "../../context/APIContextProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function Format() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useContext(APIContext);
  const [points, setPoints] = useState(2000);
  const [listCopied, setListCopied] = useState(false);
  const [displayList, setDisplayList] = useState(false);
  // console.log(isLoading);

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

  const filteredData =
    points === 0
      ? data?.filter(
          (entry) => entry.format !== "2000" && entry.format !== "1500"
        )
      : data?.filter((entry) => entry.format === points.toString());

  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);

    // Primary sorting criterion: date (newest first)
    if (date1 > date2) return -1;
    if (date1 < date2) return 1;

    // Secondary sorting criterion: rank (1st to 4th)
    const rankOrder = {
      "1st": 1,
      "2nd": 2,
      "3rd": 3,
      "4th": 4,
    };
    const rank1 = rankOrder[entry1.rank];
    const rank2 = rankOrder[entry2.rank];

    return rank1 - rank2;
  });

  const copyListToClipboard = (list) => {
    navigator.clipboard.writeText(list);
    setListCopied(true);
    setTimeout(() => {
      setListCopied(false);
    }, 3000);
  };

  const buttonActive = (points) => {
    setPoints(points);
    setDisplayList(true);
  };

  return (
    <>
      <h2>Format</h2>

      <button className="btn btn-primary" onClick={() => buttonActive(2000)}>
        2000{" "}
      </button>

      <button className="btn btn-primary" onClick={() => buttonActive(1500)}>
        1500
      </button>

      <button className="btn btn-primary" onClick={() => buttonActive(1250)}>
        1250
      </button>

      <button className="btn btn-primary" onClick={() => buttonActive(0)}>
        Other
      </button>

      {isLoading ? (
        <div className="loading-container">
          <p>Loading... (may take up to 50 seconds)</p>
          <LoadingSpinner />
        </div>
      ) : displayList ? (
        <div className={styles.tournamentContainer}>
          {filteredData.map((entry, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.daten}>{entry.format} pts </p>
              <p className={styles.daten}>{formatRank(entry.rank)}</p>
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
        <p>Please select a format!</p>
      )}
    </>
  );
}
