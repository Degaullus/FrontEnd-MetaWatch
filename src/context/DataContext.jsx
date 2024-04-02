import React, {createContext, useState, useEffect } from 'react'

export const DataContext = createContext()


export default function DataContextProvider(props) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('../SimulationData.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }; 
        fetchData();; 
    }, []);


    return (
        <DataContext.Provider value={{data, isLoading, error}}>
            {props.children}  
        </DataContext.Provider>
    );

}