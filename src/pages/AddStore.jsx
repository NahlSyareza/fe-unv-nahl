import React from "react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";

import axios from "axios";

export default function AddStore() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getName, setName] = useState("");
  const [getAddress, setAddress] = useState("");

  const navigate = useNavigate();

  const nameInput = (e) => {
    setName(e.target.value);
  };

  const inputAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div
      className={`h-screen w-screen font-jetbrains flex flex-col items-center text-white ${theme}`}
    >
      <ToastContainer position="bottom-center" autoClose={1000} />
      <Navbar />
      <div className="w-1/4 h-4/6 bg-blue-600 rounded-xl flex flex-col items-center my-auto">
        <div className="m-20">
          <p className="text-2xl">Add Store</p>
        </div>
        <div className="m-4 w-full px-12">
          <p>Name</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => nameInput(e)}
          />
        </div>
        <div className="m-4 w-full px-12">
          <p>Address</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => inputAddress(e)}
          />
        </div>
        <div className="m-8 flex-1 w-full flex justify-center items-center">
          <button
            className="p-3 bg-gray-800 rounded-md"
            onClick={async () => {
              if (getName.length < 1 || getAddress.length < 1) {
                alert("Fill in the blanks please!");
                return;
              }

              await axios
                .post(`https://be-unv-nahl.vercel.app/store/create`, {
                  name: getName,
                  address: getAddress,
                })
                .then((e) => {
                  console.log(e.data);
                  if (e.data.success) {
                    toast.success("New store added!");
                  }
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
