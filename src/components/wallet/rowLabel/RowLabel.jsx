import "./rowLabel.scss";
import { Button } from "@mui/material"
import Tilt from "../Tilt";


export default function RowLabel({text, setBlur, setNewType, delta}) {
  return (
    <Tilt className="row-label">
      <Button onClick={() => {setBlur(true); setNewType(text)}}>
        <div className="text">
          {text}
          <div className="delta">{delta}</div>
        </div>
      </Button>
    </Tilt>
  )
}
