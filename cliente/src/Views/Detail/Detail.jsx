import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
import video from "../../assets/video/05.mp4";
import { Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [dog, setdog] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
      if (data.name) {
        setdog(data);
        console.log(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setdog({});
  }, [id]);
  
  console.log(dog.Temperament)
  

  return (
    <div className={style.container}>
      <video className={style.video} src={video} autoPlay muted loop></video>
      <div className={style.cardsContainer}>
        <img
          className={style.dogImage}
          src={dog?.image}
          alt={dog?.name}
        />
        <h2 className={style.h2}>NAME: {dog.name}</h2>
        <h3 className={style.h3}>id: {dog.id}</h3>
        <h3 className={style.h3}>Origin: {dog?.origin}</h3>
        <h3 className={style.h3}>Temperament: {dog?.temperament}</h3>
        <h3 className={style.h3}>Life span: {dog.life_span}</h3>
        <h3 className={style.h3}>Weight: {dog.weight}</h3>
        <h3 className={style.h3}>Height: {dog.height}</h3>
      </div>
      <div>
      <Link to="/home">
          <button className={style.loginButton}>Home</button>
           </Link>
      </div>
    </div>
  );
}
