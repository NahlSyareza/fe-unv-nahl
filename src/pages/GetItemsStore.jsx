import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import axios from "axios";

export default function GetItemsStore() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getStores, setStores] = useState([]);
  const [getItems, setItems] = useState([]);
  const [getId, setId] = useState("");

  useEffect(() => {
    axios
      .get("https://be-unv-nahl.vercel.app/store/getAll")
      .then((e) => {
        console.log(e.data);
        setStores(e.data.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    console.log("Test");
    axios
      .get(`https://be-unv-nahl.vercel.app/item/byStoreId/${getId}`)
      .then((e) => {
        console.log(e.data);
        setItems(e.data.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [getId]);

  const dummy = [
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
    { ID: 1, name: "Something" },
  ];

  const inputId = (e) => {
    setId(e.target.value);
  };

  return (
    <div
      className={`h-screen w-screen font-jetbrains flex flex-col items-center text-white ${theme}`}
    >
      <Navbar />
      <div className="w-full h-[10%] flex justify-center items-center">
        <p>Get Items Store</p>
      </div>
      <div className="w-full h-auto">
        <select
          className="text-black m-4"
          onChange={(e) => inputId(e)}
          value={getId}
        >
          <option value="" hidden>
            Select store
          </option>
          {getStores.map((item, id) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
        <ul>
          {!getItems ? (
            <p className="p-2 mx-2">No items found</p>
          ) : (
            getItems.map((item, id) => {
              return (
                <li className="border-t p-2 mx-2">
                  <div>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{item.stock}x</p>
                  </div>
                </li>
              );
            })
          )}
          <li className="border-t p-2 mx-2"></li>
        </ul>
      </div>
    </div>
  );
}
