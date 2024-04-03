import styles from "./Chaos.module.css";
import { useAPI } from "../../../../context/apiContext";

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
    return date2 - date1; // Descending order (newest first)
  });

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
            </li>
          ))}
        </ul>
      ) : (
        <p>No data found containing "Chaos" in the army name.</p>
      )}
    </>
  );
}
