// Style imports
import "./App.scss";
import theme from "./assets/style/theme";

// Library Imports
import { ThemeProvider } from "@mui/material"

// Component imports
import Navbar from "./components/navbar/Navbar";
import Cards from "./components/cards/Cards";

function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar/>
        <div className="waves">
          <Cards />
        </div>
      </ThemeProvider>
    </div>
  )
}



export default App;
