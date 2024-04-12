import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "react-search-input";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchUpdated = (term) => {
    setSearchTerm(term);
    if (term) {
      // Check if term is not empty before navigating
      navigate(`/search/${term}`);
    }
  };

  return (
    <div>
      <SearchInput className="search-input" onChange={searchUpdated} />
    </div>
  );
}

export default SearchBar;
