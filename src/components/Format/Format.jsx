import styles from "./Format.module.css";
import { useContext, useState } from "react";
import { APIContext } from "../../context/APIContext";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Format() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useContext(APIContext);
  const [points, setPoints] = useState(2000);
  const [listCopied, setListCopied] = useState(false);
  const [displayList, setDisplayList] = useState(false);
  const [sortList, setSortList] = useState("descDate");
  const [activeSortButton, setActiveSortButton] = useState(null);
  const { token } = useContext(AuthContext);

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
          (entry) =>
            entry.format !== "2000" &&
            entry.format !== "1500" &&
            entry.format !== "1250"
        )
      : data?.filter((entry) => entry.format === points.toString());

  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);

    if (date1 > date2) return -1;
    if (date1 < date2) return 1;

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

  if (sortList == "descDate") {
    filteredData?.sort((entry1, entry2) => {
      const date1 = new Date(entry1.date);
      const date2 = new Date(entry2.date);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
    });
  } else if (sortList == "ascDate") {
    filteredData?.sort((entry1, entry2) => {
      const date1 = new Date(entry1.date);
      const date2 = new Date(entry2.date);
      if (date1 < date2) return -1;
      if (date1 > date2) return 1;
    });
  } else if (sortList == "descRank") {
    filteredData?.sort((entry1, entry2) => {
      const rank1 = entry1.rank;
      const rank2 = entry2.rank;
      rank1 - rank2;
      return rank1 - rank2;
    });
  } else if (sortList == "ascRank") {
    filteredData?.sort((entry1, entry2) => {
      const rank1 = entry1.rank;
      const rank2 = entry2.rank;
      rank2 - rank1;
      return rank2 - rank1;
    });
  } else if (sortList == "ascFaction") {
    filteredData?.sort((entry1, entry2) => {
      const faction1 = entry1.army;
      const faction2 = entry2.army;
      if (faction1 < faction2) return -1;
      if (faction1 > faction2) return 1;
    });
  } else if (sortList == "descFaction") {
    filteredData?.sort((entry1, entry2) => {
      const faction1 = entry1.army;
      const faction2 = entry2.army;
      if (faction1 > faction2) return -1;
      if (faction1 < faction2) return 1;
    });
  }

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
  
  const handleSortButtonClick = (sortType) => {
    setSortList(sortType);
    setActiveSortButton(sortType);
  };

  const handleSaveToFavs = async (id) => {
    try {
      const res = await fetch(`${deployedAPI}/fav/add/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);

      // Check if the operation was successful based on response status or data
      if (res.ok) {
        alert("Item has been added to your favorites.");
      } else {
        alert("Failed to add the item to favorites. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert(
        "Error adding item to favorites. Check your connection and try again."
      );
    }
  };

  return (
    <>
      <div className={styles.bigBackground}>
        <div className={styles.divider1}></div>
        <div className={styles.header}>
          <h2>Format</h2>
        </div>

        <div className={styles.pointsButtonsContainer}>
          <button
            className={styles.pointsButtons}
            onClick={() => buttonActive(2000)}
          >
            2000{" "}
          </button>

          <button
            className={styles.pointsButtons}
            onClick={() => buttonActive(1500)}
          >
            1500
          </button>

          <button
            className={styles.pointsButtons}
            onClick={() => buttonActive(1250)}
          >
            1250
          </button>

          <button
            className={styles.pointsButtons} 
            onClick={() => buttonActive(0)}
          >
            Other
          </button>
        </div>

        <div className={styles.sortButtonsContainer}>
        <span
          className={`${styles.sortButtons} ${activeSortButton === "ascDate" ? styles.activeSortButtons : ''}`}
          onClick={() => handleSortButtonClick("ascDate")}
        >
          Date <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
        </span>
        <span
          className={`${styles.sortButtons} ${activeSortButton === "descDate" ? styles.activeSortButtons : ''}`}
          onClick={() => handleSortButtonClick("descDate")}
        >
          Date <FontAwesomeIcon icon={faArrowDown} style={{ color: "#ffffff" }} />
        </span>

        <span
          className={`${styles.sortButtons} ${activeSortButton === "ascRank" ? styles.activeSortButtons : ''}`}
          onClick={() => handleSortButtonClick("ascRank")}
        >
          Rank <FontAwesomeIcon icon={faArrowDown} style={{ color: "#ffffff" }} />
        </span>
        <span
          className={`${styles.sortButtons} ${activeSortButton === "descRank" ? styles.activeSortButtons : ''}`}
          onClick={() => handleSortButtonClick("descRank")}
        >
          Rank <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
        </span>
          <span
            className={`${styles.sortButtons} ${activeSortButton === "ascFaction" ? styles.activeSortButtons : ''}`}
            onClick={() => handleSortButtonClick("ascFaction")}
          >
            Faction{" "}
            <span className="margin2">
              {" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ color: "#ffffff" }}
              />
            </span>
          </span>
          <span
            className={`${styles.sortButtons} ${activeSortButton === "descFaction" ? styles.activeSortButtons : ''}`}
            onClick={() => handleSortButtonClick("descFaction")}
          >
            Faction{" "}
            <span className="margin2">
              {" "}
              <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
            </span>
          </span>
        </div>

        <div className={styles.forReset}>
          <span
            className={styles.reset}
            onClick={() => handleSortButtonClick("descDate")}
          >
            Reset
          </span>
        </div>
      </div>
      <div className={styles.divider1}></div>

      {isLoading ? (
        <div className="loading-container">
          <p>Loading... (may take up to 50 seconds)</p>
          <LoadingSpinner />
        </div>
      ) : displayList ? (
        <div className={styles.tournamentContainerBg}>
          <div className={styles.tournamentContainer}>
            {filteredData.map((entry, index) => (
              <li key={index} className={styles.card}>
                <div className={styles.tournamentInfo}>
                  <div className={styles.tournamentName}>
                    <p className={styles.tournamentDetails}>
                      {formatRank(entry.rank)}
                    </p>

                    <p
                      className={styles.tournamentDetails}
                      style={{ fontStyle: "italic" }}
                    >
                      {entry.date}
                    </p>
                  </div>
                  <p className={styles.tournamentArmy}>{entry.army}</p>

                  <p className={styles.tournamentTitle}>{entry.tournament}</p>
                  {/* spliting intro in array of words using space to delimite. Slice -2 select the 2 laste words, joins give them back into a string :) */}
                  <div className={styles.tournamentLocation}>
                    <p style={{ fontStyle: "italic" }}> {entry.location}</p>
                  </div>
                </div>
                <div className={styles.tournamentButton}>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={"#listModal" + index}
                    onClick={() => setOpenModalId(index)}
                    className="btn btn-primary"
                    disabled={entry.list == "No list submitted"}
                  >
                    Show army list
                  </button>
                </div>

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
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleSaveToFavs(entry._id);
                          e.stopPropagation();
                          setOpenModalId(null);
                        }}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Save to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <div className={styles.divider1}></div>
        </div>
      ) : (
        <div>
          {" "}
          <div>
            <p className={styles.lastP}>Please select a format!</p>
          </div>
          <div className={styles.divider1}></div>
        </div>
      )}
    </>
  );
}
