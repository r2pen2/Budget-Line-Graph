import "./home.scss";
import Typewriter from 'typewriter-effect'
import { Button, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle, auth } from "../../Firebase"

function renderButtonOnUserInfo() {
    if (localStorage.getItem('name')) {
        return <Typography className="logged-in">Signed in as {localStorage.getItem('name')}</Typography>
    } else {
        return (
            <Button variant="contained" justifyContent="center" alignItems="center" onClick={signInWithGoogle}>
                <GoogleIcon/>
                <Typography marginLeft="10px">Sign in with Google</Typography>
            </Button>
        )
    }
}

export default function Home() {
  return (
    <div className="home">
        <div className="panel">
            <div className="branding">
                <Typography className="title">
                    Budgeteer
                </Typography>
                <div className="typewriter">
                    <h3>See how much you earned since<Typewriter options={{ strings: ['yesterday.', 'this morning.', 'last week.', 'last month.', 'lunch.'], autoStart: true, loop: true, }} /></h3>
                </div>
            </div>
        </div>
        { renderButtonOnUserInfo() }
    </div>
  )
}
