import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchStoreProvider } from "./Stores/SearchStore";
import { CallAPIsProvider } from "./Stores/CallAPIsStore";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CallAPIsProvider>
      <SearchStoreProvider>
        <Router>
          <App />
        </Router>
      </SearchStoreProvider>
    </CallAPIsProvider>
  </React.StrictMode>
);
