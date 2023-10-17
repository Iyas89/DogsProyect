import DogCard from "../card/Card";
import SearchBar from "../SearchBar/SearchBar";
import style from "./cards.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import React, { useState } from "react";
import { getDogs } from "../../redux/actions";

export default function CardsContainer() {
  const dogs = useSelector((state) => state.Dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, []);


  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * dogsPerPage;
  const endIndex = currentPage * dogsPerPage;
  const currentDogs = dogs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <SearchBar className={style.searchBar} />
      <img className={style.image} src="../src/assets/picturs/04.jpg" />
      <div className={style.cardsContainer}>
        {currentDogs.map((dog) => (
          <DogCard
            key={dog.id}
            id={dog?.id}
            name={dog?.name}
            image={dog?.image}
            temperament={dog?.temperament}
          />
        ))}
      </div>
      <div className={style.pagination}>
        <button
          className={style.next}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          PREV
        </button>
        {Array.from({ length: Math.ceil(dogs.length / dogsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? style.active : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className={style.next}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(dogs.length / dogsPerPage)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
