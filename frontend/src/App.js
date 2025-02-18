import Home from "./Pages/Home/home";
import Header from "./component/header";
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mediaquery from "./hooks/mediaquery";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Userpage from "./Pages/Userpage/Userpage";
import Footer from "./Pages/Footer/Footer";
import Features from "./component/Feature";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ExtractManagement from "./Pages/Extract/Extract";

function App() { 
  const [ istopofpage , setistopofpage ] = useState(true);
  const isabovelarge = mediaquery("(min-width:1060px)");

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

  const isBlackTheme = useSelector((state) => state.Theme.isBlackTheme);

  useEffect(() => {
    document.body.className = isBlackTheme ? "bg-deep-blue text-white transition-all duration-300" : 
    "bg-pink-50 text-deep-blue transition-all duration-300";
  }, [isBlackTheme]);


  return (
    <div >
    <Router>
      <Header istopofpage={istopofpage} />
       <div style={{ marginTop: '8%' }}>
        <Routes>
          <Route path="/" element = {<Home /> }/>
          <Route path="/login" element = {< Login />} />
          <Route path ="/register" element = {<Register/>} />
          <Route path ="/userpage" element = {<Userpage/>} />
          <Route path= "/dashboard" element = {<Dashboard/>} />
          <Route path="/features" element = {<Features isabovelarge={isabovelarge}/> }/>
          <Route path="/extract" element = {<ExtractManagement/>}/>
        </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  );
}


export default App;
