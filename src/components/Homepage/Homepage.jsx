import styles from "./Homepage.module.css";
import { useContext } from "react";
import { APIContext } from "../../context/APIContextProvider";
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
  console.log(lastList);

  return (
    <div>
      <div className={styles.divider1}></div>
      <div className={styles.headerBackground}>
        <div className={styles.header}>
          <h1>Welcome to MetaHammer</h1>
          <p>
            We empower you to become a better Warhammer player by providing an
            easy access to tournament lists
          </p>
          <div className={styles.headerP}>
            <p>
              <u>Faction :</u> <br />
              Quick access to factions' winnings lists for a faction meta
            </p>
            <p>
              <u>Format :</u> <br />
              Deep dive into global meta results
            </p>
            <p>
              <u>Search :</u> <br />
              Search for events or units in winning lists
            </p>
          </div>
        </div>
        <div className={styles.divider1}></div>
        <div className={styles.divider2}></div>
        <div className={styles.divider1}></div>
      </div>

      {isLoading ? (
        <div>
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
                  Format 1000: <br />
                  {format1000k?.length}
                </p>
                <p>
                  Format 1250: <br />
                  {format1250k?.length}
                </p>
                <p>
                  Format 1500: <br />
                  {format1500k?.length}
                </p>
                <p>
                  Format 1750: <br />
                  {format1750k?.length}
                </p>
                <p>
                  Format 2000: <br />
                  {format2000k?.length}
                </p>
                <p>
                  Format 2250: <br />
                  {format2250k?.length}
                </p>
                <p>
                  Format 2500: <br />
                  {format2500k?.length}
                </p>
              </div>
            </div>
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

{
  /* <p>
        <strong>Discover the Champions of Warhammer</strong> across factions,
        formats, and locations. Warhammer Victors brings you the forefront of
        competitive Warhammer play, featuring the most successful army lists
        from global tournaments. Whether you’re into the eternal conflicts of
        Age of Sigmar or the futuristic battles of Warhammer 40,000, we’ve got
        you covered.
      </p>

      <h2>Explore by Category</h2>
      <ul>
        <li>
          <strong>Faction Focus:</strong> Dive deep into the strategies and
          compositions of winning armies from every faction. From the noble
          Stormcast Eternals to the scheming Drukhari, learn what makes a
          faction dominate on the battlefield.
        </li>
        <li>
          <strong>Format Fundamentals:</strong> Understanding the format is key
          to victory. Our detailed analyses of games, from friendly skirmishes
          to the most stringent tournament rules, will prepare you for any
          challenge.
        </li>
        <li>
          <strong>Location Highlights:</strong> Witness the global passion for
          Warhammer. Explore tournaments from different corners of the world and
          see how local meta and playstyles contribute to the global game.
        </li>
      </ul>

      <p>
        <strong>Join Our Community</strong> of enthusiasts, experts, and
        champions. Share your lists, discuss tactics, and gain insights in a
        vibrant, supportive environment. Whether you're aiming for your first
        tournament win or looking to refine your competitive edge, Warhammer
        Victors is here to guide you to your next triumph.
      </p>

      <p>
        Stay ahead of the competition with our{" "}
        <strong>up-to-date tournament feeds</strong> and expert analyses.
        Subscribe for the latest in Warhammer competitive play, and let your
        journey to victory begin!
      </p> */
}
