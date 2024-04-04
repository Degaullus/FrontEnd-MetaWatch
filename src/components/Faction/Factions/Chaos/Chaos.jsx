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
        <div>
          {filteredData.map((entry, index) => (
            <li key={index} className={styles.card}>
              <p className={styles.daten}>{entry.rank} - </p>
              <p className={styles.daten}>{entry.format} pts, </p>
         
              <p className={styles.daten}>"{entry.tournament}", </p>
            
              <p className={styles.daten} style={{fontStyle: 'italic'}}>{entry.date}, </p>
              {/* spliting intro in array of words using space to delimite. Slice -2 select the 2 laste words, joins give them back into a string :) */}
              <p className={styles.daten}> {entry.location.split(' ').slice(-2).join(' ')},</p>

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
        <p>No data found containing "Chaos" in the army name.</p>
      )}
    </>
  );
}
