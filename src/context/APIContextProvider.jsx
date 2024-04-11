import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const APIContext = createContext();

export default function APIContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("https://backend-metawatch.onrender.com/db");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      const responseData = response.data;
      // console.log(responseData);
      setTimeout( () => {
        setIsLoading(false); // Set loading to false when data fetching is complete
      }, 3000)
     
      setData(responseData);
    } catch (error) {
      console.error("Error fetching Data:", error.message);
      setIsLoading(false); // In case of error, set loading to false
    }
  };

  useEffect(() => {
   
      fetchAPI();
  }, []);

  return (
    <APIContext.Provider value={{ data, isLoading }}>
      {children}
    </APIContext.Provider>
  );
}

