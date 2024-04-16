// Favorites.jsx

import { useContext } from "react";
import style from "./Favorites.module.css";

import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { useActions } from '../../context/ActionsContext'; // Assuming ActionsContext is properly exported

export default function Favorites () {
    const { removeFavorite } = useActions();

    const handleRemoveFavorite = (tournamentId) => {
        console.log('Removing favorite:', tournamentId);
        removeFavorite(tournamentId);
    };

    return (
        <>
            <h1>Favorites</h1>
            <div className={style.favoritesContainer}>
                some favorites
            </div>
        </>
    );
}
