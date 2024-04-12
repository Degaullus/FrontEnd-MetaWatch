import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIContextProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";
import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["tournament", "list"];

function SearchResults() {
  const { searchTerm } = useParams();
  const { data, isLoading } = useContext(APIContext);

  // Ensure data is not null before filtering
  const filteredSearchedData = data ? data.filter(createFilter(searchTerm, KEYS_TO_FILTERS)) : [];

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        filteredSearchedData.length > 0 ? filteredSearchedData.map((item) => (
          <div key={item._id}>
            <div>{item.tournament}</div>
          </div>
        )) : <div>No results found.</div>
      )}
    </div>
  );
}

export default SearchResults;
