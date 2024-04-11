import { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with npm or yarn

export const ActionsContext = createContext();

export const useActions = () => useContext(ActionsContext);

export const ActionsProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const backendUrl = 'https://backend-metawatch.onrender.com/';

    const addFavorite = async (tournamentId) => {
        try {
            const response = await axios.post(`http://localhost:8080/fav/add/${tournamentId}`, { addedFavorite: tournamentId });
            if (response.data) {
                setFavorites(prev => [...prev, tournamentId]); // Assume the response data includes the new list of favorites if needed
            }
        } catch (error) {
            console.error('Failed to add favorite:', error);
        }
    };

    const removeFavorite = async (tournamentId) => {
      const token = localStorage.getItem('token');  // Retrieve the token from local storage or your state management
      console.log(token)
      console.log(tournamentId)
      try {
          const response = await axios.post(`http://localhost:8080/fav/rem/${tournamentId}`, {}, {
              headers: {
                  'Authorization': `Bearer ${token}`,  // Include the token in the request headers
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              throw new Error('HTTP error Failed to remove favorite');
          }

          const data = await response.json();
          console.log('Response data: ', data); // Log to see what the server responded with
      } catch (error) {
          console.error('Failed to remove favorite:', error);
      }
  };
  

    return (
        <ActionsContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </ActionsContext.Provider>
    );
};
