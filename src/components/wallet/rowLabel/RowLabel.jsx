import "./rowLabel.scss";
import { Button } from "@mui/material"


export default function RowLabel({text, setBlur, setNewType}) {
  return (
    <Button onClick={() => {setBlur(true); setNewType(text)}}>
      <div className="row-label">
        <div className="text">{text}
        </div>
      </div>
    </Button>
  )
}
