import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJwt } from "react-jwt";
import style from "./Favorites.module.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);

  const localAPI = "http://localhost:8080";
  // const deployedAPI = "https://backend-metawatch.onrender.com";

  useEffect(() => {
    const fetchFavoriteLists = async (listIds) => {
      try {
        setLoading(true);
        const requests = listIds.map(async (id) => {
          console.log(id);
          try {
            const response = await fetch(`${localAPI}/db/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return await response.json();
          } catch (err) {
            return {
              error: true,
              message: err.message || "Failed to fetch list",
            };
          }
        });
        const lists = await Promise.all(requests);
        setFavorites(lists);
      } catch (error) {
        console.error("Error fetching lists:", error);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    const getUserFavorites = async (userId) => {
      try {
        const res = await fetch(`${localAPI}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.favorites && data.favorites.length > 0) {
          fetchFavoriteLists(data.favorites);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };
    if (token && decodedToken?._id) {
      getUserFavorites(decodedToken._id);
    }
  }, [token, decodedToken?._id]);

  console.log(favorites);

  return (
    <>
      <h1>Saved Tournaments</h1>
      <div className={style.favoritesContainer}>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            favorites.map((list) => <div key={list._id}>{list.army}</div>)
          )}
        </div>
      </div>
    </>
  );
}
