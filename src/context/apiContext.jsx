import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const APIContext = createContext();

function APIContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const API = await axios.get("https://backend-metawatch.onrender.com/");
      axios
        .get(API)
        .then(function (response) {
          setData(response.data);
          setIsLoading(false);
          // console.log(response.data);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <APIContext.Provider value={{ data, isLoading }}>
      {children}
    </APIContext.Provider>
  );
}

export default APIContextProvider;

export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
