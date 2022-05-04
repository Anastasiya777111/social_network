import React, {Fragment} from "react";
import { Route, BrowserRouter, Routes, useRoutes } from "react-router-dom";

import Login from "./pages/login.jsx";

import Registration from "./pages/registration.jsx";



function App() {
  return (
<BrowserRouter>
      <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/registration' element={<Registration />}  />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
