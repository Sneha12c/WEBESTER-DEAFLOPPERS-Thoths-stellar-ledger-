import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mediaquery from "../hooks/mediaquery";
import logo from "../images/logo.jpg";
import menuicon from "../images/menu-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/Slice/ThemeSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Header = ({ istopofpage }) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isBlackTheme = useSelector((state)=>state.Theme.isBlackTheme);
  const [isMenuToggled, setisMenuToggled] = useState(false);
    const isabovesmallscreen = mediaquery("(min-width: 760px");
    const headerbackground = istopofpage ? `${isBlackTheme ? "bg-deep-blue" : "bg-pink-50"}` : "bg-red";
    const [loginuser , setLoginUser] = useState("")
     const logoutfun = () =>{
      localStorage.removeItem('userEmail')
      localStorage.removeItem('username')
      alert('Logout Successfully')
      window.location.reload();
      navigate('/login')
     }

    useEffect(() =>{
     const user = (localStorage.getItem('username'))
     if(user){
      setLoginUser(user);
     }
    } , [])

    const handlethemechange = ()=>{
      dispatch(toggleTheme());
    }

    return(
    <nav className={` ${headerbackground} z-40 w-full fixed top-0 py-6  h-28 px-0 `}>
      <div className={`flex items-center justify-between mx-auto w-5/6 m-0 `}>
        <div className={`flex gap-3`}>
      <img alt="df" className={`h-10 w-10 rounded-full border-2 border-sky`} src={logo}/>
        <h4 className={`font-playfair text-3xl font-bold`}>ExpenseRadar </h4>
        </div>
        {
         isabovesmallscreen ?(
            <ul className = {`flex justify-between gap-x-8 font-opensans text-md font-semibold list-none`}>
          <Link to = "/"><li className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Home</li></Link>
        <Link to="/features"><li className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Features</li>
        </Link>
        {loginuser==="" ? ( 
          <>
        <Link to = "/login" className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}><li>Login</li></Link>
        <Link to = "/register" className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}><li>Register</li></Link>
        </>
        ) : (
          <>
             <button onClick={logoutfun} className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Logout</button>  
          </>
        )}
        <Link to="/about"><li className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>About Us</li></Link> 
          <li> <button onClick={handlethemechange}>
               <FontAwesomeIcon icon={isBlackTheme ? faSun : faMoon} className="text-xl" />
               </button> </li>
                </ul>              
               ) :
                (
                 <button className={`rounded-full bg-red p-2`} 
                 onClick={()=> setisMenuToggled(!isMenuToggled)}>
                    <img alt = "menu-icon" className={`h-5 w-5 rounded`}src={menuicon}/>
                 </button>   
                )
        }
        {!isabovesmallscreen && isMenuToggled && (
            <div className="fixed right-0 bottom-0 h-full bg-blue w-[300px]">
                 <div className="flex justify-end p-12"> 
              <button onClick={()=> setisMenuToggled(!isMenuToggled) }>
              <img alt = "menu-icon" className={`h-5 w-5 rounded`}src={menuicon}/>
              </button>
                 </div>
              <ul className = {`flex flex-col gap-10 ml-[33%] text-2xl text-deep-blue`}>
               <Link to = "/"><li  className={`text-white hover:text-yellow`}>Home</li></Link>
            <Link to="/features">
            <li className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Features</li>
            </Link>
             { loginuser==="" ? (<>
             <Link to = "/login"><li  className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Login</li></Link>
             <Link to = "/register"><li  className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Register</li></Link>
             </> ) :(
               <>
              <button onClick={logoutfun} className={`${isBlackTheme ?"text-white" : "text-deep-blue"} hover:text-yellow`}>Logout</button>  
               </>
             )}
             <Link to="/about">
             <li className={`text-white hover:text-yellow`}>About Us</li>
             </Link>  
             <li> <button onClick={handlethemechange}>
               <FontAwesomeIcon icon={isBlackTheme ? faSun : faMoon} className="text-xl" />
               </button> </li>
                </ul>
            </div>    
        )}
      </div>
    </nav>
    )
}

export default Header;
