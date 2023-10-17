import {Route, Routes, useLocation} from "react-router-dom"
 

import CardsContainer from "./Views/HomePage/home"
import LandingPage from "./Views/LandingPage/LandingPage";
import Detail from "./Views/Detail/Detail"
import Create from "./Views/Form/Form" 
import NavBar from "./components/Nav/Nav";
import ErrorPage from "./Views/ErrorPage/ErrorPage";
import './App.css'

function App() {
  const location = useLocation()
  


  return (
    <div>
      {location.pathname === "/home" && <NavBar />}
      <Routes>
        <Route exact path="/" element= {<LandingPage />} />
        <Route path="/home" element= {<CardsContainer />} />
        <Route path="/dogs/:id" element= {<Detail />} />
        <Route path="/create" element= {<Create />} />       
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
