import { Link } from "react-router-dom";
import style from "./card.module.css";

function DogCard(props) {
  const { name, image, temperament } = props;

  return (
    <div className={style.cardContainer}>
      <img className={style.dogImage} src={image} alt={name} />
      <div>
        <h3 className={style.atribut}>{name}</h3>
        <h4 className={style.atribut1}>
          Temperament:{" "}
          {temperament?.length > 0 ? temperament.split(", ")[0] : "undifiend"}
        </h4>
        <Link to={`/dogs/${props.id}`} className={style.atribut1}>
          Detail
        </Link>
      </div>
    </div>
  );
}

export default DogCard;
