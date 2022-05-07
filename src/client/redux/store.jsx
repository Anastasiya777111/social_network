import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import rootReducer from "./reducers/index.jsx";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}
);

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
