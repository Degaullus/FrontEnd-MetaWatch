import styles from "./FactionSelected.module.css";
import { useAPI } from "../../context/apiContext";
import { useState } from "react"; //usestate for the popup
import { useParams } from "react-router";

export default function FactionSelected() {
  const { data, isLoading } = useAPI();
  const { id } = useParams();

  // this is filtering key="faction name"
  const filteredData = data?.entries?.filter(
    (entry) => entry.army.indexOf(id.replace("-", " ")) !== -1
  );

  // Sort filtered data by date (newest first)
  const sortedData = filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2 - date1; // Descending order (newest first) (Gemini)
  });

  // POPUP State variable to track popup visibility for each entry
  const [showPopup, setShowPopup] = useState(
    new Array(sortedData?.length).fill(false)
  );

  const handlePopupClick = (index) => {
    setShowPopup((prevShowPopup) => {
      const updatedShowPopup = [...prevShowPopup];
      updatedShowPopup[index] = !prevShowPopup[index];
      return updatedShowPopup;
    });
  };

  return (
    <>
      <h2>{`Welcome to ${id.replace("-", " ")}`}</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : filteredData?.length > 0 ? (
        <div className={styles.tournamentContainer}>
          {filteredData.map((entry, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.daten}>{entry.rank}</p>
              <p className={styles.daten}>{entry.format} pts </p>
              <p className={styles.daten}>"{entry.tournament}"</p>
              {/* spliting intro in array of words using space to delimite. Slice -2 select the 2 laste words, joins give them back into a string :) */}
              <p className={styles.daten}> {entry.location}</p>
              <p className={styles.daten} style={{ fontStyle: "italic" }}>
                {entry.date}
              </p>

              <button onClick={() => handlePopupClick(index)}>
                Show Army List
              </button>
              {/* POPUP */}
              {showPopup[index] && (
                <div className={styles.popup}>
                  <pre>{entry.list}</pre>
                  <button onClick={() => handlePopupClick(index)}>Close</button>
                </div>
              )}
            </li>
          ))}
        </div>
      ) : (
        <p>{`No data found containing ${id} in the army name.`}</p>
      )}
    </>
  );
}
