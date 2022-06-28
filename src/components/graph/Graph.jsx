import Tilt from "../wallet/Tilt";
import { useState, useEffect } from "react"
import "./graph.scss";
import RealTimeChart from "./RealTimeChart"

const pos = localStorage.getItem("budgeteer:positiveDelta") ? localStorage.getItem("budgeteer:positiveDelta") : 0;
const neg = localStorage.getItem("budgeteer:negativeDelta") ? localStorage.getItem("budgeteer:negativeDelta") : 0;
const delta = pos - neg;
const dailyDelta = delta / 52 / 7;
const refreshRate = 500;
const DAILYMS = 86400000;
const refreshDelta = (dailyDelta / (DAILYMS / 1000)) / (1000 / refreshRate);

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const deltaString = "Net: " + formatter.format(dailyDelta) + " / day";

const delay = ms => new Promise(res => setTimeout(res, ms));

export default function Graph() {
  const [now, setNow] = useState(new Date());
  const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  const fourDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4);
  const twoDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
  const [startDate, setStartDate] = useState(localStorage.getItem("budgeteer:startDate") ? new Date(localStorage.getItem("budgeteer:startDate")) : oneWeekAgo);
  const [diff, setDiff] = useState(localStorage.getItem("budgeteer:diff") ? localStorage.getItem("budgeteer:diff") : 0);
  const [pastData, setPastData] = useState([startDate.getTime(), 880], [fourDaysAgo.getTime(), 600], [twoDaysAgo.getTime(), 1100]);

  localStorage.setItem("budgeteer:startDate", startDate)

  async function refresh() {
    await delay(refreshRate);
    setNow(new Date())
  }

  const total = refreshDelta * ((now.getTime() - startDate.getTime()) / refreshRate) + diff;

  refresh();

  return (
    <div className="graph">
        <Tilt className="delta-panel">
            <div className="total">{total}</div>
            <div className="delta">{deltaString}</div>
        </Tilt>
        <RealTimeChart startDate={startDate} pastData={pastData} currentVal={total} currentTime={now}/>
    </div>
  )
}