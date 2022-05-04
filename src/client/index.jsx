import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import DataProvider from "./redux/store.jsx";

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById("root")
);
