import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import APIContextProvider from "./context/APIContextProvider.jsx";
import { LoadingProvider} from "./context/LoadingContext.jsx";
import { WindowSizeProvider } from "./context/WindowSizeContext.jsx";
import { ActionsProvider } from "./context/ActionsContext.jsx";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <ActionsProvider>
          <APIContextProvider>
            <WindowSizeProvider>
              <LoadingProvider>
                  <App />
              </LoadingProvider>
            </WindowSizeProvider>
          </APIContextProvider>
      </ActionsProvider>
  </BrowserRouter>
);
