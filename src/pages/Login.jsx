import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

import axios from "axios";

export default function Login() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const navigate = useNavigate();

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
          <p className="text-2xl">Login</p>
        </div>
        <div className="m-4 w-full px-12">
          <p>Email</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => emailInput(e)}
          />
        </div>
        <div className="m-8 w-full px-12">
          <p>Password</p>
          <input
            className="w-full text-black"
            type="text"
            onChange={(e) => passwordInput(e)}
          />
        </div>
        <div className="m-8 flex-1 w-full flex justify-center items-center">
          <button
            className="p-3 bg-gray-800 rounded-md"
            onClick={async () => {
              //   alert(`${getEmail} ${getPassword}`);

              if (getEmail.length == 0 || getPassword.length < 8) {
                alert("Fill in the blanks please!");
                return;
              }

              await axios
                .post(
                  `https://be-unv-nahl.vercel.app/user/login?email=${getEmail}&password=${getPassword}`
                )
                .then((e) => {
                  console.log(e.data);
                  if (e.data.success) {
                    localStorage.setItem("user", e.data.payload[0].name);
                    navigate("/home");
                  }
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
