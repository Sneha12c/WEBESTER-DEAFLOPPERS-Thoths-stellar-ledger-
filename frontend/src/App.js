import Home from "./component/home";
import Header from "./component/header";
import {BrowserRouter as Router , Route, Routes, Navigate} from "react-router-dom";
// import react from 'react';

import { useEffect, useState } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Userpage from "./Pages/Userpage/Userpage";

function App() {
  const [ selectedpage , setselectedpage] = useState('home'); 
  const [ istopofpage , setistopofpage ] = useState(true);
  // const isabovemediascreen = mediaquery("(min-width: 1060px)");

  useEffect( ()=>{
    const handleScroll = () =>{
      if( window.scrollY === 0)
      setistopofpage(true);
      if( window.scrollY !==0 )
      setistopofpage(false);
    }
    window.addEventListener("scroll" , handleScroll);
    return ()=> window.removeEventListener("scroll" , handleScroll);
  })

  return (
    <Router>
      <Header istopofpage={istopofpage} 
       selectedpage={selectedpage} setselectedpage={setselectedpage}/>
       <Routes>
        <Route path="/" element = {<ProtectedRoutes>
          <Home setselectedpage={setselectedpage} /> 
          </ProtectedRoutes>}
          />
        <Route path="/login" element = {< Login />} />
        <Route path ="/register" element = {<Register/>} />
        <Route path ="/userpage" element = {<Userpage/>} />
       </Routes>
      </Router>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('userEmail')){
    return props.children
  }
  else{
    return <Navigate to="/login"></Navigate>;
  }
}

export default App;
