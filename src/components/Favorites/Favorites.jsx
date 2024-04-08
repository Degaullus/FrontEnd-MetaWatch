import { useWindowSizeContext } from "../../context/WindowSizeContext";

function Favorites () {
  const size = useWindowSizeContext();
  console.log(size);

  const { width, height } = useWindowSizeContext();

    return (
        <div>
            <h1>Favorites</h1>
        </div>
    );
}

export default Favorites;