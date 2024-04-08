import styles from "./FactionSelected.module.css";
import { useAPI } from "../../context/apiContext";
import { useState } from "react"; //usestate for the popup
import { useParams } from "react-router";

export default function FactionSelected() {
  const [openModalId, setOpenModalId] = useState(null);
  const { data, isLoading } = useAPI();
  const { id } = useParams();

  // this is filtering key="faction name"
  const filteredData = data?.entries?.filter(
    (entry) => entry.army.indexOf(id.replaceAll("-", " ")) !== -1
  );

  // Sort filtered data by date (newest first)
  filteredData?.sort((entry1, entry2) => {
    const date1 = new Date(entry1.date);
    const date2 = new Date(entry2.date);
    return date2 - date1; // Descending order (newest first) (Gemini)
  });

  // POPUP State variable to track popup visibility for each entry
  // const [showPopup, setShowPopup] = useState(
  //   new Array(sortedData?.length).fill(false)
  // );

  // const handlePopupClick = (index) => {
  //   setShowPopup((prevShowPopup) => {
  //     const updatedShowPopup = [...prevShowPopup];
  //     updatedShowPopup[index] = !prevShowPopup[index];
  //     return updatedShowPopup;
  //   });
  // };

  return (
    <>
      <h2>{`Welcome to ${id.replace("-", " ").replace("-", " ")}`}</h2>
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

              <button
                type="button"
                data-bs-toggle="modal"
                // TODO - Rename "exampleModal" everywhere here to something more suitable
                data-bs-target={"#exampleModal" + index}
                onClick={() => setOpenModalId(index)}
                className="btn btn-primary"
              >
                Show army list
              </button>

              <div
                className="modal"
                id={"exampleModal" + index}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
                show={(openModalId === index).toString()}
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
                  </div>
                </div>
              </div>

              {/* <Button
                data-toggle="modal"
                data-target="#exampleModal"
                variant="primary"
                onClick={() => setOpenModalId(index)}
              >
                Show army list
              </Button>

              <VerticallyCenteredModal
                show={openModalId === index}
                onHide={() => setOpenModalId(null)}
                list={entry.list}
                id="exampleModal"
              /> */}

              {/* <button onClick={() => handlePopupClick(index)}>
                Show Army List
              </button>

              {showPopup[index] && (
                <div className={styles.popup}>
                  <pre>{entry.list}</pre>
                  <button onClick={() => handlePopupClick(index)}>Close</button>
                </div>
              )} */}
            </li>
          ))}
        </div>
      ) : (
        <p>{`No data found containing ${id} in the army name.`}</p>
      )}
    </>
  );
}
