import "./wallet.scss";
import GlassCard from "./glassCard/GlassCard";
import RowLabel from "./rowLabel/RowLabel";
import { Stack } from "@mui/material"
import { useState } from 'react'

export default function Wallet() {

  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="wrapper">
      <Stack direction="row" className="cards positive" alignItems="center">
        <RowLabel text="Income" />
        <GlassCard 
          credit={{ amount: 25, interval: "hour", target: "Sentaca", status: "active"}}
        />
        <GlassCard 
          credit={{ amount: 500, interval: "month", target: "Citrus", status: "active"}}
        />
        <GlassCard 
          credit={{ amount: 100, interval: "week", target: "COL", status: "frozen"}}
        />
      </Stack>
      <Stack direction="row" className="cards negative" alignItems="center">
        <RowLabel text="Expenses" />
        <GlassCard 
          credit={{ amount: -4.99, interval: "month", target: "Spotify", status: "active"}}
        />
      </Stack>
    </div>
  )
}
