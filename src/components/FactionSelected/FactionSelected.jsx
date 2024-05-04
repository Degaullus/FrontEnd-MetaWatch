import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { APIContext } from "../../context/APIContext";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loading/LoadingSpinner";
import styles from "./FactionSelected.module.css";

export default function FactionSelected() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const { data, isLoading } = useContext(APIContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [points, setPoints] = useState(0);
  const [sortList, setSortList] = useState("descDate");
  const [activeSortButton, setActiveSortButton] = useState(null);
  const [openModalId, setOpenModalId] = useState(null);
  const [listCopied, setListCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  const deployedAPI = "https://backend-metawatch.onrender.com";

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

  const handlePointsButtonClick = (points) => {
    setPoints(points);
    setSelectedIndex(0);
  };

  let filteredData = data?.filter((entry) => {
    const formattedId = id.replaceAll("-", " ");
    if (points === 0) return entry.army.indexOf(formattedId) !== -1;
    if (points === 50) {
      return (
        entry.army.indexOf(formattedId) !== -1 &&
        entry.format !== "2000" &&
        entry.format !== "1500" &&
        entry.format !== "1250"
      );
    }
    return entry.army.indexOf(formattedId) !== -1 && entry.format == points;
  });

  const handleSortButtonClick = (sortType) => {
    setSortList(sortType);
    setActiveSortButton(sortType);
    setSelectedIndex(0);
  };

  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    if (sortList === "descDate") return date2 - date1;
    if (sortList === "ascDate") return date1 - date2;
    if (sortList === "descRank") return entry1.rank - entry2.rank;
    if (sortList === "ascRank") return entry2.rank - entry1.rank;
  });

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

      if (res.ok) {
        alert("List has been saved to your favorites.");
      } else {
        alert("Please login to save lists to favorites.");
      }
    } catch (error) {
      console.log(error);
      alert(
        "Error adding list to favorites. Check your connection and try again."
      );
    }
  };

  return (
    <>
      <div className={styles.divider1}></div>
      <div>
        <div className={styles.headerBackground}>
          <div className={styles.headerFlex}>
            <button className={styles.headerBack} onClick={() => navigate(-1)}>
              {" "}
              ⬅ Back
            </button>
            <h2 className={styles.headerHeadline}>{`${id
              .replace("-", " ")
              .replace("-", " ")}`}</h2>
          </div>

          <div className={styles.pointsButtonsContainer}>
            <button
              className={styles.pointsButtons}
              onClick={() => handlePointsButtonClick(2000)}
            >
              2000 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => handlePointsButtonClick(1500)}
            >
              1500 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => handlePointsButtonClick(1250)}
            >
              1250 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => handlePointsButtonClick(50)}
            >
              Other
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => handlePointsButtonClick(0)}
            >
              All results
            </button>
          </div>

          <div>
            <div className={styles.sortButtonsContainer}>
              <span
                className={`${styles.sortButtons} ${
                  activeSortButton === "descDate"
                    ? styles.activeSortButtons
                    : ""
                }`}
                onClick={() => handleSortButtonClick("descDate")}
              >
                Date{" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "#ffffff" }}
                />
              </span>
              <span
                className={`${styles.sortButtons} ${
                  activeSortButton === "ascDate" ? styles.activeSortButtons : ""
                }`}
                onClick={() => handleSortButtonClick("ascDate")}
              >
                Date{" "}
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: "#ffffff" }}
                />
              </span>
              <span
                className={styles.resetButton}
                onClick={() => handleSortButtonClick("descDate")}
              >
                Reset
              </span>
              <span
                className={`${styles.sortButtons} ${
                  activeSortButton === "descRank"
                    ? styles.activeSortButtons
                    : ""
                }`}
                onClick={() => handleSortButtonClick("descRank")}
              >
                Rank{" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "#ffffff" }}
                />
              </span>
              <span
                className={`${styles.sortButtons} ${
                  activeSortButton === "ascRank" ? styles.activeSortButtons : ""
                }`}
                onClick={() => handleSortButtonClick("ascRank")}
              >
                Rank{" "}
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </div>
          </div>
          <div className={styles.divider1}></div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      ) : slicedData?.length > 0 ? (
        <div className={styles.tournamentContainerBg}>
          <div className={styles.pageButtonsTop}>
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
              <li key={index} className={styles.factionCards}>
                <div className={styles.tournamentInfo}>
                  <div className={styles.tournamentName}>
                    <p className={styles.tournamentDetails}>
                      <img
                        className={styles.cupIcon}
                        src="/cupIcon.svg"
                        alt="cupIcon"
                      />
                      {formatRank(entry.rank)}
                    </p>
                    <p className={styles.tournamentDetails}>
                      {entry.format} pts{" "}
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

                  <p className={styles.tournamentTitle}>{entry.tournament}</p>
                  <div className={styles.tournamentLocation}>
                    <p style={{ fontStyle: "italic" }}>
                      {" "}
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
                      />
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
                        data-bs-dismiss="modal"
                        aria-label="Close"
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
          </div>
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
          <div className={styles.divider1}></div>
        </div>
      ) : (
        <p>{`No data found containing ${id} in the army name.`}</p>
      )}
    </>
  );
}
