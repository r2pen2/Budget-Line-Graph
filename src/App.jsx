// Style imports
import "./App.scss";
import { Canvas } from 'react-three-fiber';
import theme from "./assets/style/theme";

// Library Imports
import { ThemeProvider } from "@mui/material"

// Component imports
import Navbar from "./components/navbar/Navbar";
import Waves from "./components/waves/Waves";

function App() {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Waves />
      </ThemeProvider>
    </div>
  )
}



export default App;
