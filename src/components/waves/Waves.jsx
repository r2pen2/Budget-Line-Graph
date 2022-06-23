import "./waves.scss";
import video from "../../assets/images/city.mp4";
import { useRef } from 'react'

export default function Waves() {
  
    const videoRef= useRef();
    const setPlayBack = () => {
      videoRef.current.playbackRate = 1;
    };

    return (
        <div className="waves">
            <video loop autoPlay muted={true} id="video" ref={videoRef} onCanPlay={() => setPlayBack()}>
                <source src={video} type="video/mp4"/>
            </video>
        </div>
    )
}
