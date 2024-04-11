import React, { useContext } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { useParams } from "react-router-dom";
import { APIContext } from "../../context/APIContextProvider";
import SearchInput, { createFilter } from "react-search-input";

const KEYS_TO_FILTERS = ["tournament", "list"];

function SearchResults() {
  const { searchTerm } = useParams();
  const { data, isLoading } = useContext(APIContext);

  const filteredSearchedData = data.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS)
  );

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        filteredSearchedData.map((item) => (
          <div key={item._id}>
            <div>{item.tournament}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchResults;
