import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";



const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/HomePage" element={<HomePage />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
