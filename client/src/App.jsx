import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./containers/HomePage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";



const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/homepage" element={<HomePage />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
