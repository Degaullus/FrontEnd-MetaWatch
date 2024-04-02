import styles from "./Faction.module.css";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

export default function Faction() { 

const {data} = useContext(DataContext)

    return (
        <>
        
        <h2>Faction</h2>
        {data && (
        <div>
            <h1>
              {data.Entry1}
            </h1>
        </div>
      )}
        </>
    )
    }