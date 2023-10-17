import { useState } from "react";
import {
  PageContainer,
  SearchContainer,
  SearchInput,
} from "./SearchBar.styles.js";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";

import { getDogByName } from "../../redux/actions.jsx";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  // No necesitas usar useEffect aquí si solo quieres buscar cuando hagas clic en el botón "Buscar".
  // useEffect(() => {
  //   dispatch(getDogByName()); // Esto no tiene sentido aquí, ya que no estás pasando un nombre como argumento.
  // }, [dispatch]);

  function changeHandler(event) {
    setName(event.target.value);
  }

  function searchDogByName() {
    try {
      // Llama a la acción para buscar por nombre y pasa el nombre como argumento
      dispatch(getDogByName(name));
    } catch (error) {
      console.error("Error al buscar perro por nombre:", error);
    }
  }

  return (
    <PageContainer>
      <SearchContainer>
        <SearchInput
          type="search"
          onChange={changeHandler}
          value={name}
          placeholder="Search Character"
        />
        <button onClick={searchDogByName}>Buscar</button>
      </SearchContainer>
    </PageContainer>
  );
}
