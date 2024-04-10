import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authContext'; 

export const favTournamentContext = createContext();

export const useTournaments = () => useContext(favTournamentContext);

export const TournamentProvider = ({ children }) => {

    const backendUrl = 'https://backend-metawatch.onrender.com/';
  
    const [tournaments, setTournaments] = useState([]);
    const { favorites, setFavorites } = useContext(AuthContext); // Access favorites from AuthContext

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const fetchedTournaments = await Promise.all(
                    favorites.map(async (id) => {
                        const response = await fetch(`${backendUrl}db/${id}`);
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

    const removeFavorite = async (tournamentId) => {
      // Assuming you have an endpoint to update the user's favorites
      try {
          const response = await fetch(`${backendUrl}fav/remove`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  // Include authorization if your API requires
              },
              body: JSON.stringify({ removedFavorite: tournamentId }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Could not remove favorite");
          // Update favorites in AuthContext
          setFavorites(favorites.filter(id => id !== tournamentId));
      } catch (error) {
          console.error("Failed to remove favorite:", error);
      }
  };

    return (
        <favTournamentContext.Provider value={{ tournaments, removeFavorite }}>
            {children}
        </favTournamentContext.Provider>
    );
};
