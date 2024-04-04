import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import APIContextProvider from "./context/apiContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <APIContextProvider>
        <App />
      </APIContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
