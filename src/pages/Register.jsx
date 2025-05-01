import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

import axios from "axios";

export default function Register() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getName, setName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const nameInput = (e) => {
    setName(e.target.value);
  };

  const emailInput = (e) => {
    setEmail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className={`h-screen w-screen font-jetbrains flex flex-col items-center text-white ${theme}`}
    >
      <Navbar />
      <div className="w-1/4 h-4/6 bg-blue-600 rounded-xl flex flex-col items-center my-auto">
        <div className="m-20">
          <p className="text-2xl">Register</p>
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
          <p>Email</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => emailInput(e)}
          />
        </div>
        <div className="m-4 w-full px-12">
          <p>Password</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => passwordInput(e)}
          />
        </div>
        <div className="m-8 flex-1 w-full justify-center items-center flex">
          <button
            className="p-3 bg-gray-800 rounded-md"
            onClick={async () => {
              if (getEmail.length == 0 || getPassword.length < 8) {
                alert("Fill in the blanks please!");
                return;
              }

              await axios
                .post(
                  `https://be-unv-nahl.vercel.app/user/register?name=${getName}&email=${getEmail}&password=${getPassword}`
                )
                .then((e) => {
                  console.log(e.data);
                  if (e.data.success) {
                    navigate("/home");
                  }
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
}
