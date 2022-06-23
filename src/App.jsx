// Style imports
import "./App.scss";
import theme from "./assets/style/theme";

// Library Imports
import { ThemeProvider } from "@mui/material"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component imports
import Navbar from "./components/navbar/Navbar";
import Wallet from "./components/wallet/Wallet";

function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar/>
        <div className="waves">
          <Router>
            <Routes>
              <Route path="/" element={<div>Graph</div>} />
              <Route path="/home" element={<div>Home</div>} />
              <Route path="/graph" element={<div>Home</div>} />
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
