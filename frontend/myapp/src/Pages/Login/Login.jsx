import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config"
import { toast } from "react-toastify";

const Login = () => {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');

  const history = useNavigate();
  
  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password
      });
      if (response.data.success) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('username' , response.data.username);
        history('/');
        toast.success("Login successful!");
        window.location.reload();
      } 
      else if (response.data === "notexist") {
        toast.success(
          "User not found.Please register!"
        );
        history("/register");
      } 
      else {
        toast.error("Password is incorrect");
      }
     }
    catch (error) {
      toast.error("server error");
    }
  }
  useEffect(() =>{
    if(localStorage.getItem('userEmail')){
      history('/')
    }
  } , [history] )

  return (
    <div className="flex items-center justify-center h-screen bg-grey top-4">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
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
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;