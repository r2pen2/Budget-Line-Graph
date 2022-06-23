import "./cards.scss";
import GlassCard from "./glassCard/GlassCard";
import { Stack } from "@mui/material"

export default function Cards() {
  return (
    <div className="wrapper">
      <Stack direction="row" className="cards positive">
        <GlassCard 
          credit={{ amount: 25, interval: "hour", target: "Sentaca"}}
        />
        <GlassCard 
          credit={{ amount: 500, interval: "month", target: "Citrus"}}
        />
      </Stack>
      <Stack direction="row" className="cards negative">
        <GlassCard 
          credit={{ amount: -4.99, interval: "month", target: "Spotify"}}
        />
      </Stack>
    </div>
  )
}
