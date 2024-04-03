import styles from "./Chaos.module.css";
import { useAPI } from "../../../../context/apiContext";
import React, {useState} from "react"; //usestate for the popup

export default function Chaos() {
  const { data, isLoading } = useAPI();

  // this is filtering key="chaos"
  const filteredData = data?.entries?.filter(
    (entry) => entry.army.toLowerCase().indexOf("chaos") !== -1 &&
    // filter out chaos dwarfs
    entry.army.toLowerCase().indexOf("chaos dwarf") === -1
  );

  // Sort filtered data by date (newest first)
  const sortedData = filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2 - date1; // Descending order (newest first) (Gemini)
  });

  // POPUP State variable to track popup visibility for each entry
  const [showPopup, setShowPopup] = useState(new Array(sortedData?.length).fill(false));

  const handlePopupClick = (index) => {
    setShowPopup((prevShowPopup) => {
      const updatedShowPopup = [...prevShowPopup];
      updatedShowPopup[index] = !prevShowPopup[index];
      return updatedShowPopup;
    });
  };

  return (
    <>
      <h2>Welcome to Chaos</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : filteredData?.length > 0 ? (
        <ul>
          {filteredData.map((entry, index) => (
            <li key={index} className={styles.card}>
              
              <p>Rank: {entry.rank}</p>
              <p>Tournament: {entry.tournament}</p>
              <p>Date: {entry.date}</p>
              <p>Players: {entry.players}</p>
              <p>Location: {entry.location}</p>
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
          
        </ul>
      ) : (
        <p>No data found containing "Chaos" in the army name.</p>
      )}
    </>
  );
}
