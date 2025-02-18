import React, { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

const Register = () => {
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const history = useNavigate();

    const handlesubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${API_URL}/api/user/register`, {
        username,
        email,
        password,
        isAdmin: isAdmin ? true : false,
      });
      console.log(response.data);
      if (response.data === "exist") {
        alert("User already exists");
      } else if (response.data === "notexist") {
        // Registration success
        alert("Registration successful");
  
        // Optionally, redirect to another page or perform other actions
        history("/login", { state: { id: email } });
      }      
    }
    catch(e){
        console.log(e);
        alert("Invalid email or password");
    }
  }
    useEffect(() =>{
      if(localStorage.getItem('userEmail')){
        history('/')
      }
    } , [history] )
      

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Choose a username"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="registerEmail"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="registerPassword"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 font-medium" >Are you Admin?
            <input type="checkbox" onChange={(e) => { setIsAdmin(e.target.value) }}   />            
          </label>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Register
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;


