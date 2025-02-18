import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ title, description, bgColor, buttonText , navigate }) => {
  const history = useNavigate();
  const handlechange = async(e)=>{
    e.preventDefault();
    history(`${navigate}`);
  }

  return (
    <div className={`rounded-lg shadow-lg p-6 ${bgColor} text-white max-w-sm`}>
      <div className="relative h-16">
        <div className="z-12">
          <p className="font-playfair font-semibold text-3xl">{title}</p>
        </div>
        <div
          className={`w-full h-20 ${bgColor} rounded-lg absolute right-0 top-0 z-[-1]`}
        />
      </div>
      <p className="mt-6 font-playfair text-lg">{description}</p>
      <Link to ={navigate} className="text-blue-500 hover:underline">
      <button
        onClick ={handlechange}
        className="mt-6 bg-white text-deep-blue px-4 py-2 rounded-lg hover:bg-opacity-80 transition"
        type="button"
        >
        {buttonText}
      </button>
      </Link>
    </div>
  );
};

export default Card;
