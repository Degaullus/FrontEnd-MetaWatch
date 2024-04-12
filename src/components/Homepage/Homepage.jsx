import styles from "./Homepage.module.css";
import { useContext } from "react";
import { APIContext } from "../../context/APIContextProvider";

export default function Homepage() {
  const { data, isLoading } = useContext(APIContext);
  const dataleng = data?.length;
  const format2500k = data?.filter((entry) => entry.format == "2500");
  const format2250k = data?.filter((entry) => entry.format == "2250");
  const format2k = data?.filter((entry) => entry.format == "2000");
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
      <div>
        <h2>Informations</h2>
        <p>
          You have access to {dataleng} winning lists from{" "}
          {Math.round(dataleng / 4)} tournaments.
        </p>
        <p>Format 2500k: {format2500k?.length}</p>
        <p>Format 2250k: {format2250k?.length}</p>
        <p>Format 2k: {format2k?.length}</p>
        <p>Format 1750k: {format1750k?.length}</p>
        <p>Format 1500k: {format1500k?.length}</p>
        <p>Format 1250k: {format1250k?.length}</p>
        <p>Format 1000k: {format1000k?.length}</p>
      </div>
      <div>
        <h2>Last turnament Winner</h2>
        {lastList?.map((entry) => (
          <div key={entry._id}>
            <h3>{entry.tournament}</h3>
            <p>{entry.date}</p>
            <p>{entry.army}</p>
            <p>{entry.format}</p>
            <p>{entry.rank.slice(1)}st</p>
            <div style={{ whiteSpace: "pre-wrap" }}>{entry.list}</div>
          </div>
        ))}
      </div>
      <h1>Welcome to Warhammer Victors!</h1>
      <p>
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
      </p>
    </div>
  );
}
