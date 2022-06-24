import "./wallet.scss";
import GlassCard from "./glassCard/GlassCard";
import RowLabel from "./rowLabel/RowLabel";
import { Stack, Button } from "@mui/material"
import { useState, useEffect, useContext } from 'react'
import { firestore, auth } from '../../Firebase'
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { UserContext } from "../../UserContext";

export default function Wallet() {

  console.log(auth);
  if (!auth.currentUser) {
    window.location = "/home"
  }

  const {user, setUser} = useContext(UserContext);
  const [credits, setCredits] = useState([]);

  useEffect(() => 
    onSnapshot(collection(firestore, "wallets"), (snapshot) => {
      for (const d of snapshot.docs) {
        credits.push({ id: d.id, data: d.data() })
      }
      console.log(credits)
    }
  ), []);

  async function handleNew() {

    const walletRef = collection(firestore, "wallets").doc(auth.currentUser.uid)

    walletRef.get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          walletRef.onSnapshot((doc) => {
            // do stuff with the data
          });
        } else {
          walletRef.set({
            // create the document
          }) 
        }
    });

    setCredits([]);
    const payload = { amount: 500, interval: "month", target: "Citrus", active: true};
    addDoc(collection(firestore, "wallets"), payload);
  }

  return (
    <div className="wrapper">
      <Stack direction="row" className="cards positive" alignItems="center">
        <RowLabel text="Income" />
        <GlassCard 
          credit={{ amount: 25, interval: "hour", target: "Sentaca", active: true}}
        />
        <GlassCard 
          credit={{ amount: 500, interval: "month", target: "Citrus", active: true}}
        />
        <GlassCard 
          credit={{ amount: 100, interval: "week", target: "COL", active: false}}
        />
      </Stack>
      <Stack direction="row" className="cards negative" alignItems="center">
        <RowLabel text="Expenses" />
        <GlassCard 
          credit={{ amount: -4.99, interval: "month", target: "Spotify", active: true}}
        />
      </Stack>
      <Button variant="contained" onClick={() => handleNew()}>New</Button>
    </div>
  )
}
