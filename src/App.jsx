// Style imports
import "./App.scss";
import theme from "./assets/style/theme";

// Library Imports
import { ThemeProvider } from "@mui/material"
import { BrowserRouter as Router } from "react-router-dom";

// Component imports
import Navbar from "./components/navbar/Navbar";
import DummyPage from "./components/dummyPage/DummyPage";

function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Router>
          <DummyPage/>
        </Router>
      </ThemeProvider>
    </div>
  )
}



export default App;
