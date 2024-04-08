import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import APIContextProvider from "./context/apiContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";
import { LoadingProvider} from "./context/LoadingContext.jsx";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      {/* <AuthContextProvider> */}
        <APIContextProvider>
          <App />
        </APIContextProvider>
      {/* </AuthContextProvider> */}
    </LoadingProvider>
  </BrowserRouter>
);
