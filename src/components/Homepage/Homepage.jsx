import styles from "./Homepage.module.css";
import { useContext, useEffect } from "react";
import { APIContext } from "../../context/APIContext";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Partenary from "../Partenary/Partenary";
import HomePageVideo from "../HomepageVideo/HomePageVideo";
import Banner from "../Banner/Banner";
import JoinUs from "../JoinUs/JoinUs";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
      window.location.reload();
    }
  }, []); // Empty dependency array ensures this effect runs once on mount and cleanup on unmount

  return (
    <div>
      <div className={styles.divider1}></div>
      <div className={styles.headerBackground}>
        <div className={styles.header}>
          <div className={styles.titleBox}>
            {" "}
            <h1 className={styles.bigtitle}>
              <span className={styles.span}>The</span>MetaHammer
            </h1>
            <h1 className={styles.explore}>Explore the Old World Meta</h1>
          </div>
          <p className={styles.empower}>
            We empower you to become a better Warhammer player by providing easy
            access to tournament lists.
          </p>
          <div className={styles.headerList}>
            <div className={styles.subMenu}>
              <Link to="/faction">
                <img
                  className={styles.iconsSub}
                  src="/iconshomepage/axe.svg"
                  alt="logosword"
                />
              </Link>

              <div className={styles.subMenuRight}>
                <p className={styles.parag}>
                  <Link className={styles.link} to="/faction">
                    Faction
                  </Link>
                  <br />
                  Quickly access winning lists tailored to each faction's meta.
                </p>
              </div>
            </div>
            <div className={styles.subMenu}>
              <Link to="/format">
                <img
                  className={styles.iconsSub}
                  src="/iconshomepage/sword.svg"
                  alt="logosword"
                />
              </Link>

              <div className={styles.subMenuRight}>
                <p className={styles.parag}>
                  <Link className={styles.link} to="/format">
                    Format
                  </Link>
                  <br />
                  All the winning lists sorted by format (2000 points, 1500
                  points, etc.).
                </p>
              </div>
            </div>
            <div className={styles.subMenu}>
              <Link to="/search/:searchTerm">
                <img
                  className={styles.iconsSub}
                  src="/iconshomepage/search.svg"
                  alt="logosword"
                />
              </Link>

              <div className={styles.subMenuRight}>
                <p className={styles.parag}>
                  <Link className={styles.link} to="/search/:searchTerm">
                    Search
                  </Link>{" "}
                  <br />
                  Easily find specific events or units within winning lists.
                </p>
              </div>
            </div>
          </div>
          <JoinUs />
          <div className={styles.headerRight}></div>
        </div>
        <HomePageVideo />

        <div className={styles.divider1}></div>

        <div className={styles.divider2}></div>
        <div className={styles.divider1}></div>
      </div>
      <div className={styles.divider1}></div>
      <Partenary />
      <div className={styles.divider1}></div>
      <Banner />
      <div className={styles.divider1}></div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
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
              <div className={styles.informationContainerFormat}>
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
                <div
                  className={styles.tournamentContainerList}
                  style={{ whiteSpace: "pre-wrap" }}
                >
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
