import React from 'react';
import style from './LandingPage.module.css';
import { Link } from "react-router-dom";
import video from "../../assets/video/01.mp4"

function LandingPage() {
  return (
    <div className={style.landingContainer}>
      <video
      className={style.video}
      src={video}
      autoPlay
      muted
      loop>
      </video>
          <Link to="/home">
          <button className={style.loginButton}>HOME</button>
           </Link>
    </div>
  );
}

export default LandingPage;
