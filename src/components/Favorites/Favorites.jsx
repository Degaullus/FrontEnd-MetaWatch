// Favorites.jsx

import { useContext } from "react";
import style from "./Favorites.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { favTournamentContext } from "../../context/tournamentsObjContext";
import { useActions } from '../../context/ActionsContext'; // Assuming ActionsContext is properly exported

export default function Favorites () {
    const { tournaments } = useContext(favTournamentContext);
    const { removeFavorite } = useActions();

    const handleRemoveFavorite = (tournamentId) => {
        console.log('Removing favorite:', tournamentId);
        removeFavorite(tournamentId);
    };

    return (
        <>
            <h1>Favorites</h1>
            <div className={style.favoritesContainer}>
            {tournaments.length > 0 ? (
                tournaments.map((tournament) => (
                    <div className={style.tournament} key={tournament._id}>
                        <h2 className={style.tournamentH2}>{tournament.army}</h2>
                        <p className={style.tournamentP}>{tournament.list}</p>
                        <button className={style.tournamentButton} onClick={() => handleRemoveFavorite(tournament._id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>No favorites yet</p>
            )}
            </div>
        </>
    );
}
