import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIContext";
import { AuthContext } from "../../context/AuthContext";

import LoadingSpinner from "../Loading/LoadingSpinner";
import SearchInput, { createFilter } from "react-search-input";
import styles from "./SearchResults.module.css";

const KEYS_TO_FILTERS = ["tournament", "list"];

function SearchResults() {
  const { searchTerm } = useParams();
  const { data, isLoading } = useContext(APIContext);
  const [openModalId, setOpenModalId] = useState(null);
  const [listCopied, setListCopied] = useState(false);
  const { token } = useContext(AuthContext);
  const [flag, setFlag] = useState(false);
  const deployedAPI = "https://backend-metawatch.onrender.com";

  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  // Make sure data is lowercased if necessary or trimmed
  const searchTermNormalized = searchTerm.trim().toLowerCase();
  const filteredSearchedData = data
    ? data.filter(createFilter(searchTermNormalized, KEYS_TO_FILTERS))
    : [];

  // console.log("Filtered Data:", filteredSearchedData);

  // Ensure you check for the normalized searchTerm
  const listsContainingSearchTerm = filteredSearchedData.filter((entry) => {
    return (
      entry.list && entry.list.toLowerCase().includes(searchTermNormalized)
    );
  });

  // console.log(
  //   "Entries with searchTerm in list:",
  //   listsContainingSearchTerm.length
  // );

  // Function to copy list to clipboard and close modal
  const copyListToClipboard = (list) => {
    const textToCopy = `${list}\n ******** All The Old World Winning Lists on https://themetahammer.com ********`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setListCopied(true);
        setTimeout(() => {
          setListCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  // Function to save to favorites and close modal
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
    <div className={styles.resultBackground}>
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {listsContainingSearchTerm.length > 0 ? (
              <div className={styles.searchSummary}>
                Unit found in the following {listsContainingSearchTerm.length}{" "}
                lists
              </div>
            ) : (
              <div className={styles.searchSummary}>
                Event found! Here are the Top {filteredSearchedData.length}{" "}
                Players!
              </div>
            )}
            {filteredSearchedData.length > 0 ? (
              filteredSearchedData.map((entry, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.containerInfo}>
                    <p className={styles.tournamentDetails}>{entry.army} - </p>
                    <p className={styles.tournamentDetails}>
                      {entry.format} pts -
                    </p>
                    <p className={styles.tournamentDetails}>
                      Rank: {entry.rank.slice(1)}
                    </p>
                  </div>

                  <div className={styles.subInfos}>
                    <div className={styles.leftSide}>
                      <p className={styles.subEntry}>{entry.tournament}</p>
                      <p className={styles.location}>{entry.location}</p>
                    </div>
                    <div className={styles.rightSide}>
                      {" "}
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={"#listModal" + index}
                        onClick={() => setOpenModalId(index)}
                        className="btn btn-primary"
                        disabled={entry.list == "No list submitted"}
                      >
                        Show army list
                      </button>{" "}
                    </div>
                  </div>

                  <div
                    className="modal"
                    id={"listModal" + index}
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="listModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
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
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          aria-label="Close"
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
                          }}
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Save to Favorites
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No results found.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
