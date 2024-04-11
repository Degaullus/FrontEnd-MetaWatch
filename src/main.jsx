import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import APIContextProvider from "./context/APIContextProvider.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import { LoadingProvider} from "./context/LoadingContext.jsx";
import { WindowSizeProvider } from "./context/WindowSizeContext.jsx";
import { TournamentProvider } from "./context/favTournamentsContext.jsx";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthContextProvider>
      <TournamentProvider>
        <APIContextProvider>
          <WindowSizeProvider>
            <LoadingProvider>
                <App />
            </LoadingProvider>
          </WindowSizeProvider>
        </APIContextProvider>
      </TournamentProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
