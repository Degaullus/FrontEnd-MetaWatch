import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIContext";
import LoadingSpinner from "../Loading/LoadingSpinner";
import SearchInput, { createFilter } from "react-search-input";
import styles from "./SearchResults.module.css";

const KEYS_TO_FILTERS = ["tournament", "list"];

function SearchResults() {
  const { searchTerm } = useParams();
  const { data, isLoading } = useContext(APIContext);
  const [openModalId, setOpenModalId] = useState(null);
  const [listCopied, setListCopied] = useState(false);

  // Make sure data is lowercased if necessary or trimmed
  const searchTermNormalized = searchTerm.trim().toLowerCase();
  const filteredSearchedData = data
    ? data.filter(createFilter(searchTermNormalized, KEYS_TO_FILTERS))
    : [];

  console.log("Filtered Data:", filteredSearchedData);

  // Ensure you check for the normalized searchTerm
  const listsContainingSearchTerm = filteredSearchedData.filter((entry) => {
    return (
      entry.list && entry.list.toLowerCase().includes(searchTermNormalized)
    );
  });

  console.log(
    "Entries with searchTerm in list:",
    listsContainingSearchTerm.length
  );

  // Function to copy list to clipboard
  const copyListToClipboard = (list) => {
    navigator.clipboard.writeText(list);
    setListCopied(true);
    setTimeout(() => {
      setListCopied(false);
    }, 3000); // Reset copied state after 3 seconds
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {listsContainingSearchTerm.length > 0 ? (
            <div className={styles.searchSummary}>
              Unit found in the following {listsContainingSearchTerm.length}{" "}
              lists:
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
                  <p className={styles.tournamentDetails}>
                    {entry.format} pts,{" "}
                  </p>
                  <p className={styles.tournamentDetails}>
                    "{entry.tournament}",
                  </p>
                  <p className={styles.tournamentDetails}>{entry.location}, </p>
                </div>

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
              </div>
            ))
          ) : (
            <div>No results found.</div>
          )}
        </>
      )}
    </div>
  );
}

export default SearchResults;
