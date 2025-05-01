import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

export default function GetItemId() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getId, setId] = useState("");
  const [getItem, setItem] = useState([]);

  const inputId = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    console.log(getId);
    console.log(getItem);
    axios
      .get(`https://be-unv-nahl.vercel.app/item/byId/${getId}`)
      .then((e) => {
        console.log(e.data);
        if (e.data.success) {
          toast.success(`Retrieved item information!`);
          setItem(e.data.payload);
        }
      })
      .catch((e) => console.error(e));
  }, [getId]);

  const dummy = [
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
  ];

  return (
    <div
      className={`h-screen w-screen font-jetbrains flex flex-col items-center text-white ${theme}`}
    >
      <ToastContainer position="bottom-center" autoClose={1000} />
      <Navbar />
      <div className="w-full h-[10%] flex justify-center items-center">
        <p>Get Item by ID</p>
      </div>
      <div className="w-full h-auto">
        <input
          type="text"
          className="mb-2 mx-2 text-black"
          onChange={(e) => inputId(e)}
        />
        {!getItem ? (
          <p className="text-white border-t border-b m-2 p-2">No item found</p>
        ) : (
          getItem.map((item, id) => {
            return (
              <div className="text-white border-t border-b m-2 p-2">
                <p>ID: {item.id}</p>
                <p>Name: {item.name}</p>
                <p>Stock: {item.stock}x</p>
                <p>Price: {item.price}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
