import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-b-xl h-24 bg-sky-700 flex text-white">
      <div className="w-1/2 h-full flex items-center">
        <button
          className="m-2"
          onClick={() => {
            navigate("/home");
          }}
        >{`Hello, ${localStorage.getItem("user")}`}</button>
      </div>
      <div className="w-1/2 h-full flex justify-end items-center">
        <p className="m-2 w-28">Transactions</p>
        <div className="w-0.5 h-16 bg-blue-500 m-2"></div>
        <button
          className="m-2 w-20 text-center"
          onClick={() => {
            navigate("/stores");
          }}
        >
          Stores
        </button>
        <div className="w-0.5 h-16 bg-blue-500 m-2"></div>
        <button
          className="m-2 w-20 text-center"
          onClick={() => {
            navigate("/items");
          }}
        >
          Items
        </button>
        <div className="w-0.5 h-16 bg-blue-500 m-2"></div>
        <button
          className="m-2 w-20 text-center"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
        <div className="w-0.5 h-16 bg-blue-500 m-2"></div>
        <button
          className="m-2 w-20 text-center"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
