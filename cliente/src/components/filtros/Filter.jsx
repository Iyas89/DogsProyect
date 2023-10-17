import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getfilterDogs,
  getorderDogs,
  filterTemperaments,
  getTemprement,
} from "../../redux/actions";
import style from "./Filter.module.css";

export default function FilterDogs() {
  const dispatch = useDispatch();
  const temprementos = useSelector((state) => state.Temprement);
  const order = useSelector((state) => state.orderAndFilter.order);
  const tempFilter = useSelector((state) => state.orderAndFilter.tempFilter);
  const originFilter = useSelector((state) => state.orderAndFilter.originFilter);

  useEffect(() => {
    dispatch(getTemprement());
  }, []);

  const handlerFilterDogs = (event) => {
    dispatch(getfilterDogs(event.target.value));
  };
  const handlerFilterTemprement = (event) => {
    dispatch(filterTemperaments(event.target.value));
  };

  const handlerOrdenDogs = (event) => {
    dispatch(getorderDogs(event.target.value));
  };

  return (
    <div className={style.cardsContainer}>
      <div className={style.cardsContainer}>
        <select name="order" value={order} onChange={handlerFilterDogs}>
          <option value="Todos">Todos</option>
          <option value="DATA_BASE">DATA BASE</option>
          <option value="API">API</option>
        </select>
        <div>
          <select
            name="tempFilter"
            value={tempFilter}
            onChange={handlerFilterTemprement}
          >
            <option value="Todos">Todos</option>
            {temprementos.map((temprem) => (
              <option key={temprem.id} value={temprem.name}>
                {temprem.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            name="filterOrigin"
            value={originFilter}
            onChange={handlerOrdenDogs}
          >
            <option value="Todos">Todos</option>
            <option value="alfabético_Ascendente">alfabético Ascendente</option>
            <option value="alfabético_Descendente">alfabético Descendente</option>
            <option value="weight_Ascendente">weight Ascendente</option>
            <option value="weight_Descendente">weight Descendente</option>
          </select>
        </div>
      </div>
    </div>
  );
}
