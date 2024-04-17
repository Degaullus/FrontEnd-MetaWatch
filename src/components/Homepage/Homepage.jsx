import styles from "./Homepage.module.css";
import { useContext } from "react";
import { APIContext } from "../../context/APIContext";
import LoadingSpinner from "../Loading/LoadingSpinner";

export default function Homepage() {
  const { data, isLoading } = useContext(APIContext);
  const dataleng = data?.length;
  const format2500k = data?.filter((entry) => entry.format == "2500");
  const format2250k = data?.filter((entry) => entry.format == "2250");
  const format2000k = data?.filter((entry) => entry.format == "2000");
  const format1750k = data?.filter((entry) => entry.format == "1750");
  const format1500k = data?.filter((entry) => entry.format == "1500");
  const format1250k = data?.filter((entry) => entry.format == "1250");
  const format1000k = data?.filter((entry) => entry.format == "1000");

  // Sort filtered data by date (newest first)
  const dataLastListsPreSlice = data?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2 - date1;
  });
  //display last list
  const lastList = dataLastListsPreSlice?.slice(0, 1);

  return (
    <div>
      <div className={styles.divider1}></div>
      <div className={styles.headerBackground}>
        <div className={styles.header}>
          <h1>
            Welcome to
            <br />
            MetaHammer
          </h1>
          <p>
            We empower you to become a better Warhammer player by providing easy
            access to tournament lists.
          </p>
          <div className={styles.headerP}>
            <p>
              <u>
                {" "}
                <b>Faction :</b>
              </u>{" "}
              <br />
              Faction: Quickly access winning lists tailored to each faction's
              meta.
            </p>
            <p>
              <u>
                <b>Format :</b>
              </u>{" "}
              <br />
              Format: Delve deeply into global meta results.
            </p>
            <p>
              <u>
                <b>Search :</b>
              </u>{" "}
              <br />
              Search: Easily find specific events or units within winning lists
            </p>
          </div>
          <div className={styles.headerRight}></div>
        </div>
        <div className={styles.divider1}></div>
        <div className={styles.divider2}></div>
        <div className={styles.divider1}></div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <p>Tournament information loading.. May take up to 50 seconds</p>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <div className={styles.informationBackground}>
            <div className={styles.informationContainer}>
              <h2>Information</h2>
              <p>
                You have access to {dataleng} winning lists from{" "}
                {Math.round(dataleng / 4)} tournaments.
              </p>
              <div className={styles.informationContainerP}>
                <p>
                  <u>
                    Format 1000: <br />
                  </u>
                  {format1000k?.length}
                </p>
                <p>
                  <u>
                    Format 1250: <br />
                  </u>
                  {format1250k?.length}
                </p>
                <p>
                  <u>
                    Format 1500: <br />
                  </u>
                  {format1500k?.length}
                </p>
                <p>
                  <u>
                    Format 1750: <br />
                  </u>
                  {format1750k?.length}
                </p>
                <p>
                  <u>
                    Format 2000: <br />
                  </u>
                  {format2000k?.length}
                </p>
                <p>
                  <u>
                    Format 2250: <br />
                  </u>
                  {format2250k?.length}
                </p>
                <p>
                  <u>
                    Format 2500: <br />
                  </u>
                  {format2500k?.length}
                </p>
              </div>
            </div>
            <div className={styles.divider1}></div>
            <div className={styles.divider2}></div>
            <div className={styles.divider1}></div>
          </div>

          {lastList?.map((entry) => (
            <div className={styles.tournamentBackground}>
              <div className={styles.tournamentContainer} key={entry._id}>
                <h3>Most recent tournament winning list</h3>
                <p>
                  <strong>{entry.tournament}</strong>
                </p>
                <p>
                  <strong>{entry.date}</strong>
                </p>
                <p>
                  <strong>{entry.army}</strong>
                </p>
                <p>
                  <strong>{entry.format} pts.</strong>
                </p>
                <p>
                  <strong>{entry.rank.slice(1)}st rank</strong>
                </p>
                <div className={styles.list} style={{ whiteSpace: "pre-wrap" }}>
                  {entry.list}
                </div>
              </div>
            </div>
          ))}
          <div className={styles.divider1}></div>
        </div>
      )}
    </div>
  );
}
