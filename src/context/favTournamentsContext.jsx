import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authContext'; 
export const favTournamentContext = createContext();

export const useTournaments = () => useContext(favTournamentContext);

export const TournamentProvider = ({ children }) => {
  
    const [tournaments, setTournaments] = useState([]);
    const { favorites } = useContext(AuthContext); // Access favorites from AuthContext

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const fetchedTournaments = await Promise.all(
                    favorites.map(async (id) => {
                        const response = await fetch(`http://localhost:8080/db/${id}`);
                        if (!response.ok) throw new Error('Could not fetch tournament data');
                        return response.json();
                    })
                );
                setTournaments(fetchedTournaments);
            } catch (error) {
                console.error("Failed to fetch tournaments: ", error);
            }
        };

        if (favorites.length > 0) {
            fetchTournaments();
        }

    }, [favorites]); // Re-run when favorites change

    return (
        <favTournamentContext.Provider value={{ tournaments }}>
            {children}
        </favTournamentContext.Provider>
    );
};
