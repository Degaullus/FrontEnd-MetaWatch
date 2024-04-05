import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const APIContext = createContext();

function APIContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const API = "/SimulationDB.json";
    axios
      .get(API)
      .then(function (response) {
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      })
      .catch((error) => console.log(error));
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
