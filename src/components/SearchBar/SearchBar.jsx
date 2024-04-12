import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "react-search-input";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchUpdated = (term) => {
    setSearchTerm(term);
    if (term) {
      navigate(`/search/${term}`);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        className="search-input" 
        value={searchTerm}
        onChange={(e) => searchUpdated(e.target.value)}
        placeholder="Search for Events/Units"
      />
    </div>
  );
}


export default SearchBar;
