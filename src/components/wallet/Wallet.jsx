import "./wallet.scss";
import GlassCard from "./glassCard/GlassCard";
import RowLabel from "./rowLabel/RowLabel";
import { Stack, Button, Modal, TextField, Select, MenuItem, Typography } from "@mui/material"
import { useState, useEffect } from 'react'
import { firestore } from '../../Firebase'
import { onSnapshot, doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore";
import Tilt from "./Tilt"

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

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
  const [newInt, setNewInt] = useState("hour");
  const [newTgt, setNewTgt] = useState("");
  const [newType, setNewType] = useState("");
  const [newReps, setNewReps] = useState(0);

  const [positiveDelta, setPositiveDelta] = useState(localStorage.getItem("budgeteer:positiveDelta") ? JSON.parse(localStorage.getItem("budgeteer:positiveDelta")) : 0);
  const [negativeDelta, setNegativeDelta] = useState(localStorage.getItem("budgeteer:negativeDelta") ? JSON.parse(localStorage.getItem("budgeteer:negativeDelta")) : 0);

  const [submitEnable, setSubmitEnable] = useState(false);

  useEffect(() => {
    fetchCredits().then(setBlur(false));
  }, [dbCalls])

  async function fetchCredits() {
    localStorage.removeItem("budgeteer:positiveDelta");
    localStorage.removeItem("budgeteer:negativeDelta");
    const docRef = doc(firestore, "wallets", user.uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newCredits = [];
      const dbCredits = JSON.parse(docSnap.data().credits);
      console.log(dbCredits)
      var pos = 0;
      var neg = 0;
      dbCredits.forEach((c) => {
        if (c.active) {
          if (c.amount > 0) {
            pos = pos + c.delta;
          } else {
            neg = neg + c.delta;
          }
        }
        newCredits.push(c);
      });
      setPositiveDelta(pos);
      setNegativeDelta(neg);
      setCredits(newCredits);
      localStorage.setItem("budgeteer:positiveDelta", positiveDelta);
      localStorage.setItem("budgeteer:negativeDelta", negativeDelta);
    } else {
      console.log("No such document!");
      localStorage.removeItem('budgeteer:credits');
      setCredits([]);
    }
  }

  function getYearlyDelta(interval, amount, cycles) {
    var weekly;
    var monthly;
    var yearly;
    switch(interval) {
      case "hour":
        weekly = amount * cycles;
        yearly = weekly * 52;
        return yearly;
      case "week":
        monthly = amount * cycles;
        yearly = monthly * 12;
        return yearly;
      case "month":
        yearly = amount *  cycles;
        return yearly;
      case "year":
        return amount * cycles;
      default:
        return 0;
    }
  }

  async function addNew() {
    setBlur(false);
    const c = { amount: (newType === "Add Income" ? newAmt : (newAmt*-1)), interval: newInt, target: newTgt, active: true, delta: getYearlyDelta(newInt, newAmt, newReps), id: randomString(8) }
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

  async function freezeCredit(c) {
    console.log("Freezing: " + c.id);
    const docRef = doc(firestore, "wallets", user.uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbCredits = JSON.parse(docSnap.data().credits);
      const safeCredits = [];
      dbCredits.forEach((credit) => {
        if (credit.id !== c.id) {
          console.log("IDs do not match: " + credit.id + " and " + c.id);
          safeCredits.push(credit);
        } else {
          const newActive = !c.active;
          const frozenCredit = {
            amount: c.amount,
            interval: c.interval,
            delta: c.delta,
            target: c.target,
            id: c.id,
            active: newActive
          }
          safeCredits.push(frozenCredit);
          setDbCalls(dbCalls + 1);
        }
      })
      const json = JSON.stringify(safeCredits);
      await setDoc(doc(firestore, "wallets", user.uid), 
        {
          credits: json
        }
      ); 
      setCredits(safeCredits);
    } else {
      console.log("No such document!");
    }
  }

  async function deleteCredit(c) {
    console.log("Deleting: " + c.id);
    const docRef = doc(firestore, "wallets", user.uid); 
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const dbCredits = JSON.parse(docSnap.data().credits);
      const safeCredits = [];
      dbCredits.forEach((credit) => {
        if (credit.id !== c.id) {
          console.log("IDs do not match: " + credit.id + " and " + c.id);
          safeCredits.push(credit);
        }
      })
      const json = JSON.stringify(safeCredits);
      await setDoc(doc(firestore, "wallets", user.uid), 
        {
          credits: json
        }
      ); 
      setDbCalls(dbCalls + 1);
    } else {
      console.log("No such document!");
    }
  }

  function generateCards(type) {
    localStorage.setItem("budgeteer:credits", JSON.stringify(credits));
    return credits.map((c) => {
      if (type === "positive") {
        if (c.amount > 0) {
          return <GlassCard credit={c} deleteCredit={deleteCredit} freezeCredit={freezeCredit}/>;
        }  
      } else {
        if (c.amount <= 0) {
          return <GlassCard credit={c} deleteCredit={deleteCredit} freezeCredit={freezeCredit}/>;
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

  function getDeltaString(d) {
    const wk = d / 52;
    const day = wk / 7;
    return formatter.format(day) + " / day";
  }

  return (
    <div className="wrapper">
      <Stack direction="row" className="cards positive" alignItems="center">
        <RowLabel text="Add Income" setBlur={setBlur} setNewType={setNewType} delta={getDeltaString(positiveDelta)}/>
        { generateCards("positive") }
      </Stack>
      <Stack direction="row" className="cards negative" alignItems="center">
        <RowLabel text="Add Expenses" setBlur={setBlur} setNewType={setNewType} delta={getDeltaString(negativeDelta)}/>
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
            <TextField color="inputYellow" required id="target" label="Target" type="text" value={newTgt} onChange={e => setNewTgt(e.target.value)} onKeyUp={enableSubmit} onBlur={enableSubmit} onKeyDown={(e) => {handleEnter(e)}}/>
            <TextField color="inputYellow" required id="amount" label="Amount" type="text" value={newAmt} onChange={e => setNewAmt(e.target.value)} onKeyUp={enableSubmit} onBlur={enableSubmit} onKeyDown={(e) => {handleEnter(e)}}/>
            <Select
              color="inputYellow"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={newInt ? newInt : "hour"}
              label="Interval"
              onChange={(e) => {setNewInt(e.target.value); enableSubmit();}}
              onBlur={enableSubmit}
            >
              <MenuItem value={"hour"}>Hourly</MenuItem>
              <MenuItem value={"week"}>Weekly</MenuItem>
              <MenuItem value={"month"}>Monthly</MenuItem>
              <MenuItem value={"year"}>Yearly</MenuItem>
            </Select>
            <TextField color="inputYellow" required id="cycles" label="Cycles / Upper Unit (hr/wk, wk/month, month/yr)" type="text" value={newReps} onChange={e => setNewReps(e.target.value)} onKeyUp={enableSubmit} onBlur={enableSubmit} onKeyDown={(e) => {handleEnter(e)}}/>
            <Button variant="contained" onClick={() => addNew()} disabled={false}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
