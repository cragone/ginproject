import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./containers/HomePage";
import RegisterPage from "./containers/RegisterPage";



const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/Register" element={<RegisterPage />}/>
            <Route path="/HomePage" element={<HomePage />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
