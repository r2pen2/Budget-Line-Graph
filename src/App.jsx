// Style imports
import "./App.scss";
import theme from "./assets/style/theme";

// Library Imports
import { ThemeProvider } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { React, useState } from 'react';

// Component imports
import Navbar from "./components/navbar/Navbar";
import Wallet from "./components/wallet/Wallet";
import Home from "./components/home/Home";

function App() {

  return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <Navbar />
          <div className="waves">
            <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/graph" element={<div>Graph</div>} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/logout" element={<div>Logout</div>} />
                </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </div>
  )
}



export default App;
