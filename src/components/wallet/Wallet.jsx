import "./wallet.scss";
import GlassCard from "./glassCard/GlassCard";
import RowLabel from "./rowLabel/RowLabel";
import { Stack, Button, Modal, TextField, Select, MenuItem, Typography } from "@mui/material"
import { useState, useEffect } from 'react'
import { firestore } from '../../Firebase'
import { onSnapshot, doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore";

function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  if (! length) {
      length = Math.floor(Math.random() * chars.length);
  }

  var str = '';
  for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

const user = JSON.parse(localStorage.getItem("budgeteer:user"));

export default function Wallet() {

  if (!user) { window.location = "/home"; }

  const [credits, setCredits] = useState(localStorage.getItem("budgeteer:credits") ? JSON.parse(localStorage.getItem("budgeteer:credits")) : []);
  const [blur, setBlur] = useState(true);
  const [dbCalls, setDbCalls] = useState(0);

  const [newAmt, setNewAmt] = useState("");
  const [newInt, setNewInt] = useState("");
  const [newTgt, setNewTgt] = useState("");
  const [newType, setNewType] = useState("");

  const [submitEnable, setSubmitEnable] = useState(false);

  useEffect(() => {
    fetchCredits().then(setBlur(false));
  }, [dbCalls])

  async function fetchCredits() {
    const docRef = doc(firestore, "wallets", user.uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newCredits = [];
      const dbCredits = JSON.parse(docSnap.data().credits);
      console.log(dbCredits)
      dbCredits.forEach((c) => {
        newCredits.push(c);
      });
      setCredits(newCredits);
    } else {
      console.log("No such document!");
      localStorage.removeItem('budgeteer:credits');
      setCredits([]);
    }
  }

  async function addNew() {
    setBlur(false);
    const c = { amount: (newType === "Add Income" ? newAmt : (newAmt*-1)), interval: newInt, target: newTgt, active: true, id: randomString(8) }
    const docRef = doc(firestore, "wallets", user.uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbCredits = JSON.parse(docSnap.data().credits);
      dbCredits.push(c);
      const json = JSON.stringify(dbCredits);
      await setDoc(doc(firestore, "wallets", user.uid), 
        {
          credits: json
        }
      ); 
      setDbCalls(dbCalls + 1);
    } else {
      console.log("No such document! Creating a new one...");
      const json = JSON.stringify([c]);
      await setDoc(doc(firestore, "wallets", user.uid), 
        {
          credits: json
        }
      ); 
      setDbCalls(dbCalls + 1);
      setNewTgt("");
      setNewInt("");
      setNewAmt("");
    }
  }

  async function deleteCredit(c) {
    console.log("Deleting: " + c);
  }

  function generateCards(type) {
    localStorage.setItem("budgeteer:credits", JSON.stringify(credits));
    return credits.map((c) => {
      if (type === "positive") {
        if (c.amount > 0) {
          return <GlassCard credit={c} deleteCredit={deleteCredit} />;
        }  
      } else {
        if (c.amount <= 0) {
          return <GlassCard credit={c} deleteCredit={deleteCredit} />;
        }
      }
    });
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (submitEnable) {
        addNew();
      }
    }
  }

  function enableSubmit() {
    if (newAmt && newTgt && newInt) {
      if ((newAmt !== 0) && (newInt.length > 0) && (newTgt.length > 0)) {
        setSubmitEnable(true);
        return;
      }
    }
    setSubmitEnable(false)
  }

  return (
    <div className="wrapper">
      <Stack direction="row" className="cards positive" alignItems="center">
        <RowLabel text="Add Income" setBlur={setBlur} setNewType={setNewType}/>
        { generateCards("positive") }
      </Stack>
      <Stack direction="row" className="cards negative" alignItems="center">
        <RowLabel text="Add Expenses" setBlur={setBlur} setNewType={setNewType}/>
        { generateCards("negative") }
      </Stack>
      <Modal
        open={blur}
        onClose={() => setBlur(false)}
        className="modal"
      >
        <div className="new-form">
          <div className="title">{newType}</div>
          <div className="fields">
            <TextField required id="target" label="Target" type="text" value={newTgt} onChange={e => setNewTgt(e.target.value)} onKeyUp={enableSubmit} onBlur={enableSubmit} onKeyDown={(e) => {handleEnter(e)}}/>
            <TextField required id="amount" label="Amount" type="text" value={newAmt} onChange={e => setNewAmt(e.target.value)} onKeyUp={enableSubmit} onBlur={enableSubmit} onKeyDown={(e) => {handleEnter(e)}}/>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newInt ? newInt : "hour"}
              label="Interval"
              onChange={(e) => {setNewInt(e.target.value); enableSubmit();}}
              onBlur={enableSubmit}
            >
              <MenuItem value={"hour"}>Hourly</MenuItem>
              <MenuItem value={"day"}>Daily</MenuItem>
              <MenuItem value={"week"}>Weekly</MenuItem>
              <MenuItem value={"month"}>Monthly</MenuItem>
              <MenuItem value={"year"}>Yearly</MenuItem>
            </Select>
            <Button variant="contained" onClick={() => addNew()} disabled={false}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
