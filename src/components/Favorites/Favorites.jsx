import { useState, useEffect, useContext } from "react";
import style from "./Favorites.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { favTournamentContext } from "../../context/favTournamentsContext";

export default function Favorites () {
    const { tournaments, removeFavorite } = useContext(favTournamentContext);
    

    return (
        <>
            <h1>Favorites</h1>
            <div className={style.favoritesContainer}>
            {tournaments.length > 0 ? (
                tournaments.map((tournament) => (
                    <div className={style.tournament} key={tournament._id}>
                        <h2 className={style.tournamentH2}>{tournament.army}</h2>
                        <p className={style.tournamentP}>{tournament.list}</p>
                        <button className={style.tournamentButton} onClick={removeFavorite}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No favorites yet</p>
            )}
            </div>
        </>
    );
  }