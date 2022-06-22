import "./topbar.scss"
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import logo from "../../assets/images/LogoBlack.png"

export default function Topbar() {

    return (
        <AppBar position="static" >
            <div className="topbar-logo-container">
                <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
                            <img src={logo} alt="logo" style={{width: "40px"}}></img>
                        </IconButton>
                        <Typography variant="h4" component="div" fontFamily="FredokaOne" sx={{ flexGrow: 1 }}>
                            Citrus
                        </Typography>
                </Toolbar>
            </div>
        </AppBar>   )
}
