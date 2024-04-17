import styles from "./FactionSelected.module.css";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { APIContext } from "../../context/APIContext";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function FactionSelected() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useContext(APIContext);
  const { id } = useParams();
  const [points, setPoints] = useState(0);
  const [sortList, setSortList] = useState("descDate");
  const navigate = useNavigate();
  const [listCopied, setListCopied] = useState(false); // State variable to track if list is copied
  const { token } = useContext(AuthContext);

  // const localAPI = "http://localhost:8080";
  const deployedAPI = "https://backend-metawatch.onrender.com";

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

  // Original filtering when all formats had their own button
  // const filteredData =
  //   points == 0
  //     ? data?.filter(
  //         (entry) => entry.army.indexOf(id.replaceAll("-", " ")) !== -1
  //       )
  //     : data?.filter(
  //         (entry) =>
  //           entry.army.indexOf(id.replaceAll("-", " ")) !== -1 &&
  //           entry.format == points
  //       );

  let filteredData = data?.filter(
    (entry) => entry.army.indexOf(id.replaceAll("-", " ")) !== -1
  );

  if (points == 0) {
    filteredData = data?.filter(
      (entry) => entry.army.indexOf(id.replaceAll("-", " ")) !== -1
    );
  } else if (points == 50) {
    filteredData = data?.filter(
      (entry) =>
        entry.format !== "2000" &&
        entry.format !== "1500" &&
        entry.format !== "1250"
    );
  } else {
    filteredData = data?.filter(
      (entry) =>
        entry.army.indexOf(id.replaceAll("-", " ")) !== -1 &&
        entry.format == points
    );
  }

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
  }

  // Function to copy list to clipboard
  const copyListToClipboard = (list) => {
    navigator.clipboard.writeText(list);
    setListCopied(true);
    setTimeout(() => {
      setListCopied(false);
    }, 3000); // Reset copied state after 3 seconds
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
      <div className={styles.divider1}></div>
      <div className={styles.bigBackround}>
        <div className={styles.topBackground}>
          <div className={styles.header}>
            <button onClick={() => navigate(-1)}> ⬅ Back</button>
            <h2>{`${id.replace("-", " ").replace("-", " ")}`}</h2>
          </div>

          <div className={styles.pointsButtonsContainer}>
            <button
              className={styles.pointsButtons}
              onClick={() => setPoints(2000)}
            >
              2000 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => setPoints(1500)}
            >
              1500 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => setPoints(1250)}
            >
              1250 Points
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => setPoints(50)}
            >
              Other
            </button>
            <button
              className={styles.pointsButtons}
              onClick={() => setPoints(0)}
            >
              All results
            </button>
          </div>

          <div className={styles.sortButtonsContainer}>
            <span
              className={styles.sortButtons}
              onClick={() => setSortList("ascDate")}
            >
              Date{" "}
              <span className="margin2">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </span>
            <span
              className={styles.sortButtons}
              onClick={() => setSortList("descDate")}
            >
              Date{" "}
              <span className="margin2">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </span>
            <span
              className={styles.reset}
              onClick={() => setSortList("descDate")}
            >
              Reset
            </span>
            <span
              className={styles.sortButtons}
              onClick={() => setSortList("ascRank")}
            >
              Rank
              <span className="margin2">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </span>
            <span
              className={styles.sortButtons}
              onClick={() => setSortList("descRank")}
            >
              Rank{" "}
              <span className="margin2">
                {" "}
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: "#ffffff" }}
                />
              </span>
            </span>
          </div>
          <div className={styles.divider1}></div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <p>Loading... (may take up to 50 seconds)</p>
          <LoadingSpinner />
        </div>
      ) : filteredData?.length > 0 ? (
        <div className={styles.tournamentContainerBg}>
          <div className={styles.tournamentContainer}>
            {filteredData.map((entry, index) => (
              <li key={index} className={styles.card}>
                <div className={styles.tournamentInfo}>
                  <div className={styles.tournamentName}>
                    <p className={styles.tournamentDetails}>
                      {formatRank(entry.rank)}
                    </p>
                    <p className={styles.tournamentDetails}>
                      {entry.format} pts{" "}
                    </p>
                    <p
                      className={styles.tournamentDetails}
                      style={{ fontStyle: "italic" }}
                    >
                      {entry.date}
                    </p>
                  </div>

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
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        {listCopied && openModalId === index
                          ? "Copied!"
                          : "Copy List"}
                      </button>

                      <br />
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

                      {/* commented out for test version purpose */}
                      {/*  <button>Add to favorites</button> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </div>
          <div className={styles.divider1}></div>
        </div>
      ) : (
        <p>{`No data found containing ${id} in the army name.`}</p>
      )}
    </>
  );
}
