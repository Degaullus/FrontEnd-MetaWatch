import { useWindowSizeContext } from "../../context/WindowSizeContext";

function Favorites () {

  const { width, height } = useWindowSizeContext();
  
    return (
        <div>
            <h1>Favorites</h1>
        </div>
    );
}

export default Favorites;