import "./home.scss";
import Typewriter from 'typewriter-effect'
import { Button, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle } from "../../Firebase"

export default function Home() {

    async function handleSignIn() {
        signInWithGoogle().then((newUser) => {
            localStorage.setItem("budgeteer:user", JSON.stringify(newUser));
            window.location = "/wallet";
        });
    }

    const user = JSON.parse(localStorage.getItem("budgeteer:user"));

    function renderButtonOnUserInfo(user) {
        if (user) {
            return <Typography className="logged-in">Signed in as {user.displayName}</Typography>
        } else {
            return (
                <Button variant="contained" onClick={() => handleSignIn()}>
                    <GoogleIcon/>
                    <Typography marginLeft="10px">Sign in with Google</Typography>
                </Button>
            )
        }
    }

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
        { renderButtonOnUserInfo(user) }
    </div>
  )
}
