import style from './home.module.css'
import CardsContainer from '../../components/cardsContainer/CardsContainer';
import {useDispatch} from "react-redux"
import { useEffect } from 'react';
import {getDogs} from "../../redux/actions"


function Home() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getDogs())
  }, [])
  

  return (
    <div className={style.homeContainer}>
      <CardsContainer />
    </div>
  )
}

export default Home;