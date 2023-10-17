import { Link } from "react-router-dom";
import style from "./Nav.module.css"
import { useDispatch, useSelector } from "react-redux";
import  { useEffect } from 'react';
import {getDogs} from "../../redux/actions"
import Filter from "../filtros/Filter.jsx"

function NavBar() {
 const allDogs = useSelector(state => state.allDogs)
 const dispatch = useDispatch()

 useEffect (()=> {
  dispatch(getDogs)
 },[dispatch])


  return (
<div className={style.navContainer}>
      <Filter className={style.filterContainer} />
      <div>
      <Link to="/home" onClick={allDogs}>
        <button className={style.button}>Home</button>
      </Link>
      <Link to="/create">
      <button className={style.button}>Create</button>
      </Link>
      </div>
      <div>
      <Link to="/">
        <button className={style.logoutButton}>
          Log Out
          </button>
          </Link>
      </div>
      </div>
    
  );
}

export default NavBar;
