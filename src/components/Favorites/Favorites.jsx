import { useState, useEffect, useContext } from "react";

import { useWindowSizeContext } from "../../context/WindowSizeContext";
import { AuthContext } from "../../context/authContext";

export default function Favorites () {

    const { favorites } = useContext(AuthContext);
    



    return (
        <h1>Favorites</h1>
    );
  }