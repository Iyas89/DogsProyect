import React, { useState, useEffect } from "react";
import style from "./Form.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getTemprement } from "../../redux/actions";
import { Link } from "react-router-dom";
import Validation from "./Validation.jsx";
import video from "../../assets/video/pexels-mikhail-nilov-6502896 (Original).mp4";

export default function Form() {
  const temprementos = useSelector((state) => state.Temprement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemprement());
  }, [dispatch]);

  const [message, setMessage] = useState(""); 

  const [create, setCreate] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    origin: "",
    temperament: [],
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    origin: "",
    temperament: [],
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (property === "temperament") {
      const tempSelector = event.target.value;
      if (!create.temperament.includes(tempSelector)) {
        setCreate({
          ...create,
          temperament: [...create.temperament, tempSelector],
        });
      }
    } else {
      setCreate({
        ...create,
        [property]: value,
      });
    }
    setError(
      Validation({
        ...create,
        [property]: value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !create.name ||
      !create.temperament.length === 0 ||
      !create.minWeight ||
      !create.life_span
    ) {
      alert("please , you have to complet the information.");
      return;
    }
    

    if (!error.length) {
      try {
        let newDog = {
          name: create.name,
          image: create.image,
          weight: `${create.minWeight} - ${create.maxWeight}`,
          height: `${create.minHeight} - ${create.maxHeight}`,
          life_span: create.life_span,
          origin: create.origin,
          temperament: create.temperament,
        };
        const response = await axios.post("http://localhost:3001/dogs", newDog);

        if (response.status === 200) {
          setMessage("¡you had create a new Dog!");

          setCreate({
            name: "",
            image: "",
            minHeight: "",
            maxHeight: "",
            minWeight: "",
            maxWeight: "",
            life_span: "",
            origin: "",
            temperament: [],
          });
        }  
      } catch (error) {
        console.error("Error al enviar los datos al servidor:", error);
        setMessage("There is a problem sendig the information to the server.", error);
      }
    }
  };

  return (
    <div className={style.formContainer}>
      <video className={style.video} src={video} autoPlay muted loop></video>
      <form onSubmit={handleSubmit} className={style.create}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={create.name}
            onChange={handleChange}
            placeholder="Name of Dog"
          />
          {error.name && <span>{error.name}</span>}
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={create.image}
            onChange={handleChange}
            placeholder="URL image of Dog"
          />
          {error.image && <span>{error.image}</span>}
        </label>
        <label>
          Origin:
          <input
            type="text"
            name="origin"
            value={create.origin}
            onChange={handleChange}
            placeholder="Origin"
          />
        </label>
        <label>
          Min Height:
          <input
            type="number"
            name="minHeight"
            value={create.minHeight}
            onChange={handleChange}
            placeholder="Minim Height"
          />
          {error.minHeight && <span>{error.minHeight}</span>}
        </label>
        <label>
          Max Height:
          <input
            type="number"
            name="maxHeight"
            value={create.maxHeight}
            onChange={handleChange}
            placeholder="Maxim Height"
          />
          {error.maxHeight && <span>{error.maxHeight}</span>}
        </label>
        <label>
          Min Weight:
          <input
            type="number"
            name="minWeight"
            value={create.minWeight}
            onChange={handleChange}
            placeholder="Minim weight"
          />
          {error.minWeight && <span>{error.minWeight}</span>}
        </label>
        <label>
          Max Weight:
          <input
            type="number"
            name="maxWeight"
            value={create.maxWeight}
            onChange={handleChange}
            placeholder="Maxim weight"
          />
          {error.maxWeight && <span>{error.maxWeight}</span>}
        </label>
        <label>
          Life Span:
          <input
            type="number"
            name="life_span"
            value={create.life_span}
            onChange={handleChange}
            placeholder="Life span"
          />
          {error.life_span && <span>{error.life_span}</span>}
        </label>
        <br />
        <label>
          Temperament:
          <select
            name="temperament"
            multiple
            value={create.temperament}
            onChange={handleChange}
          >
            {temprementos.map((temprem) => (
              <option type="checkbox" key={temprem.id} value={temprem.name}>
                {temprem.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Dog</button>
      </form>
      {message && <div className={style.message}>{message}</div>}
      <div>
        <Link to="/home">
          <button className={style.loginButton}>Home</button>
        </Link>
      </div>
    </div>
  );
}
