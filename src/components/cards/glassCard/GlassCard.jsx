import "./glassCard.scss";

import React from 'react'
import Tilt from "../Tilt";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

function generateParagraph(credit) {
  var string = "";
  if (credit.amount > 0) {
    string = "You are earning " + formatter.format(credit.amount) + " every " + credit.interval + " from " + credit.target;
  } else {
    string = "You are paying " + formatter.format(credit.amount) + " every " + credit.interval + " to " + credit.target;
  }
  return <p>{string}</p>
}

function generatePriceTooltip(credit) {

  function getTimeAbbreviation(interval) {
    switch (interval) {
      case "year":
        return "yr";
      case "month":
        return "mo";
      case "week":
        return "wk";
      case "day":
        return "day";
      case "hour":
        return "hr";
      default:
        return "?";
    }
  }

  function getDirClass(dir) {
    return dir === "+" ? "positive" : "negative";
  }

  const amt = formatter.format(credit.amount);
  const dir = credit.amount > 0 ? "+" : ""
  const string = dir + amt + " / " + getTimeAbbreviation(credit.interval);
  return <div className={"price " + getDirClass(dir)}>{string}</div>
}

function getDirection(credit) {
  return credit.amount > 0 ? "positive" : "negative";
}

export default function GlassCard({ credit }) {
  return (
    <Tilt color="green">
        <div className={"card " + getDirection(credit)}>
            <div className="title">
              <div className="header">{credit.target}</div>
              {generatePriceTooltip(credit)}
            </div>
            <div className="content">
              {generateParagraph(credit)}
              <a href={"#" + credit.target}>Edit</a>
            </div>
        </div>
    </Tilt>
  )
}
