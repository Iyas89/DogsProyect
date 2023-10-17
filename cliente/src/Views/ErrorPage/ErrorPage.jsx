import video from "../../assets/video/10.mp4"
import style from './ErrorPage.module.css';
import { Link } from "react-router-dom";


function ErrorPage() {
  return (
    <div>
      <h1 className={style.h1}> Error 404 </h1>
      <video
      className={style.video}
      src={video}
      autoPlay
      muted
      loop>
      </video>
          <Link to="/home">
          <button className={style.loginButton}>Home</button>
           </Link>
    </div>
  );
}

export default ErrorPage;