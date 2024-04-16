import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useJwt } from "react-jwt";
import style from "./Favorites.module.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  const [flag, setFlag] = useState(false);

  // const localAPI = "http://localhost:8080";
  const deployedAPI = "https://backend-metawatch.onrender.com";

  useEffect(() => {
    const fetchFavoriteLists = async (listIds) => {
      try {
        setLoading(true);
        const requests = listIds.map(async (id) => {
          console.log(id);
          try {
            const response = await fetch(`${deployedAPI}/db/${id}`, {
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
        const res = await fetch(`${deployedAPI}/users/${userId}`, {
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
  }, [token, decodedToken?._id, flag]);

  console.log(favorites);
  console.log(token);

  const handleRemoveFavorite = async (id) => {
    try {
      const res = await fetch(`${deployedAPI}/fav/rem/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Saved Tournaments</h1>
      <div className={style.favoritesContainer}>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            favorites.map((list) => (
              <div key={list._id}>
                <div className={style.listHeader}>{list.army}</div>
                <div className={style.listBody}>{list.list}</div>
                <button onClick={() => handleRemoveFavorite(list._id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
