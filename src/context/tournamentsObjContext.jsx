import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authContext'; 

export const favTournamentContext = createContext();

export const useTournaments = () => useContext(favTournamentContext);

export const TournamentProvider = ({ children }) => {

    const backendUrl = 'https://backend-metawatch.onrender.com/';
  
    const [tournaments, setTournament] = useState([]);
    const { favorites, setFavorites } = useContext(AuthContext); // Access favorites from AuthContext

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const tournamentObj = await Promise.all(
                    favorites.map(async (id) => {
                        const response = await fetch(`http://localhost:8080/db/${id}`);
                        if (!response.ok) throw new Error('Could not fetch tournaments data');
                        return response.json();
                    })
                );
                // console.log(tournamentObj)
                setTournament(tournamentObj);
            } catch (error) {
                console.error("Failed to fetch tournaments: ", error);
            }
        };

        if (favorites.length > 0) {
            fetchTournaments();
        }

    }, [favorites]); 
  
    return (
        <favTournamentContext.Provider value={{ tournaments }}>
            {children}
        </favTournamentContext.Provider>
    );
};
