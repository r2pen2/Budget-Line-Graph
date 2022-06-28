import Tilt from "../wallet/Tilt";
import { useState, useEffect } from "react"
import "./graph.scss";
import RealTimeChart from "./RealTimeChart"

const pos = localStorage.getItem("budgeteer:positiveDelta") ? localStorage.getItem("budgeteer:positiveDelta") : 0;
const neg = localStorage.getItem("budgeteer:negativeDelta") ? localStorage.getItem("budgeteer:negativeDelta") : 0;
const delta = pos - neg;
const dailyDelta = delta / 52 / 7;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const deltaString = "Net: " + formatter.format(dailyDelta) + " / day";

export default function Graph() {

  return (
    <div className="graph">
        <Tilt className="delta-panel">
            {deltaString}
        </Tilt>
        <RealTimeChart/>
    </div>
  )
}