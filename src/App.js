import "./App.scss"
import { ThemeProvider, Typography, Stack } from "@mui/material"

import { BrowserRouter as Router } from "react-router-dom";
import Topbar from "./components/topbar/Topbar"
import BottomNav from "./components/bottomnav/BottomNav"
import SpinningLogo from "./components/spinningLogo/SpinningLogo"

import theme from "./assets/style/theme"

function App() {

  const showBottomNav = false;

  function renderBottomNav() {
    if (showBottomNav) {
      return <BottomNav />
    }
  }

  return (
  <Router>
    <ThemeProvider theme={theme}>
      <Topbar />
        <Stack className="content">
          <SpinningLogo />
          <Typography component="div" variant="h4" marginTop="50px">Citrus | Coming Soon!</Typography>
        </Stack>
      { renderBottomNav() }
    </ThemeProvider>
  </Router>
  )
}



export default App;
