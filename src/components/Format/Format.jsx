import styles from "./Format.module.css";
import { useContext, useState, useEffect } from "react";
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  // console.log(isLoading);
  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

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

    if (sortList === "descDate") return date2 - date1;
    if (sortList === "ascDate") return date1 - date2;
    if (sortList === "descRank") return entry1.rank - entry2.rank;
    if (sortList === "ascRank") return entry2.rank - entry1.rank;
    if (sortList === "ascFaction")
      return entry1.army.localeCompare(entry2.army);
    if (sortList === "descFaction")
      return entry2.army.localeCompare(entry1.army);
  });

  const handleSortButtonClick = (sortType) => {
    setSortList(sortType);
    setActiveSortButton(sortType);
    setSelectedIndex(0);
  };

  let slicedData;

  if (filteredData?.length < 10) {
    slicedData = filteredData;
  } else {
    slicedData = filteredData?.slice(selectedIndex, selectedIndex + 15);
  }

  const nextButton = () => {
    setSelectedIndex(selectedIndex + 15);
  };

  const backButton = () => {
    setSelectedIndex(selectedIndex - 15);
  };

  const copyListToClipboard = (list) => {
    navigator.clipboard.writeText(list);
    setListCopied(true);
    setTimeout(() => {
      setListCopied(false);
    }, 3000);
  };

  const handlePointsButtonClick = (points) => {
    setPoints(points);
    setDisplayList(true);
    setSelectedIndex(0);
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
      <div className={styles.headerBackground}>
        <div className={styles.divider1}></div>
        <div className={styles.header}>
          <h2>Format</h2>
        </div>

        <div className={styles.pointsButtonsContainer}>
          <button
            className={styles.pointsButtons}
            onClick={() => handlePointsButtonClick(2000)}
          >
            2000{" "}
          </button>

          <button
            className={styles.pointsButtons}
            onClick={() => handlePointsButtonClick(1500)}
          >
            1500
          </button>

          <button
            className={styles.pointsButtons}
            onClick={() => handlePointsButtonClick(1250)}
          >
            1250
          </button>

          <button
            className={styles.pointsButtons}
            onClick={() => handlePointsButtonClick(0)}
          >
            Other
          </button>
        </div>

        <div className={styles.sortButtonsContainer}>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "descDate" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("descDate")}
          >
            Date{" "}
            <FontAwesomeIcon icon={faArrowDown} style={{ color: "#ffffff" }} />
          </span>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "ascDate" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("ascDate")}
          >
            Date{" "}
            <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
          </span>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "descRank" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("descRank")}
          >
            Rank{" "}
            <FontAwesomeIcon icon={faArrowDown} style={{ color: "#ffffff" }} />
          </span>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "ascRank" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("ascRank")}
          >
            Rank{" "}
            <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
          </span>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "ascFaction" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("ascFaction")}
          >
            Faction{" "}
            <span style={{ margin: "0.2rem" }}>
              {" "}
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ color: "#ffffff" }}
              />
            </span>
          </span>
          <span
            className={`${styles.sortButtons} ${
              activeSortButton === "descFaction" ? styles.activeSortButtons : ""
            }`}
            onClick={() => handleSortButtonClick("descFaction")}
          >
            Faction{" "}
            <span style={{ margin: "0.2rem" }}>
              {" "}
              <FontAwesomeIcon icon={faArrowUp} style={{ color: "#ffffff" }} />
            </span>
          </span>
        </div>

        <div className={styles.resetContainer}>
          <span
            className={styles.resetButton}
            onClick={() => handleSortButtonClick("descDate")}
          >
            Reset
          </span>
        </div>
      </div>
      <div className={styles.divider1}></div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : displayList ? (
        <div className={styles.tournamentContainerBg}>
          <div className={styles.pageButtonsTop} id={styles.pageButtonsTop}>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => backButton()}
              disabled={selectedIndex == 0}
            >
              Previous Page
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => nextButton()}
              disabled={selectedIndex + 10 > filteredData.length}
            >
              Next Page
            </button>
          </div>
          <div className={styles.tournamentContainer}>
            {slicedData.map((entry, index) => (
              <li key={index} className={styles.tournamentCards}>
                <div className={styles.tournamentInfo}>
                  <div className={styles.tournamentName}>
                    <p className={styles.tournamentDetails}>
                      <img
                        className={styles.cupIcon}
                        src="/cupIcon.svg"
                        alt="cupicon"
                      />
                      {formatRank(entry.rank)}
                    </p>

                    <p>
                      Wins : {entry.wins}/{entry.rounds}
                    </p>
                    <p>
                      <img
                        src="/playersIcon.svg"
                        alt="playersIcon"
                        className={styles.playersIcon}
                      />
                      {entry.players}
                    </p>
                  </div>
                  <p className={styles.tournamentArmy}>{entry.army}</p>

                  <p className={styles.tournamentTitle}>{entry.tournament}</p>
                  {/* spliting intro in array of words using space to delimite. Slice -2 select the 2 laste words, joins give them back into a string :) */}
                  <div className={styles.tournamentLocation}>
                    <p style={{ fontStyle: "italic" }}>
                      <img
                        className={styles.locationIcon}
                        src="/locationIcon.svg"
                        alt="locationIcon"
                      />
                      {entry.location}
                    </p>
                    <p>
                      <img
                        className={styles.calenderIcon}
                        src="/calenderIcon.svg"
                        alt="calenderIcon"
                      />{" "}
                      {entry.date}
                    </p>
                  </div>
                </div>
                <div className={styles.tournamentButton}>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={"#listModal" + index}
                    onClick={() => setOpenModalId(index)}
                    className="btn btn-dark btn-right"
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
                          <span aria-hidden="true"></span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <pre>{entry.list}</pre>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyListToClipboard(entry.list)}
                        className="btn btn-dark"
                      >
                        {listCopied && openModalId === index
                          ? "Copied!"
                          : "Copy List"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-dark"
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
            <div className={styles.pageButtonsBottom}>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => backButton()}
                disabled={selectedIndex == 0}
              >
                Previous Page
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => nextButton()}
                disabled={selectedIndex + 10 > filteredData.length}
              >
                Next Page
              </button>
            </div>
          </div>
          <div className={styles.divider1}></div>
        </div>
      ) : (
        <div>
          {" "}
          <div className={styles.selectFormatDiv}>
            <p className={styles.selectFormatText}>Please select a format!</p>
          </div>
          <div className={styles.divider1}></div>
        </div>
      )}
    </>
  );
}
