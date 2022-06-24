import "./home.scss";
import { useContext } from 'react'
import Typewriter from 'typewriter-effect'
import { Button, Typography } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithGoogle, auth } from "../../Firebase"
import { UserContext } from '../../UserContext';


export default function Home() {
    const {user, setUser} = useContext(UserContext);

    async function handleSignIn() {
        let signIn = await signInWithGoogle();
        setUser(signIn);
    }

    function renderButtonOnUserInfo(user) {
        if (user) {
            return <Typography className="logged-in">Signed in as {user.displayName}</Typography>
        } else {
            return (
                <Button variant="contained" justifyContent="center" alignItems="center" onClick={() => handleSignIn()}>
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
