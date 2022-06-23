import "./rowLabel.scss";

export default function RowLabel({text}) {
  return (
    <div className="row-label">
        <div className="text">{text}</div>
    </div>
  )
}
