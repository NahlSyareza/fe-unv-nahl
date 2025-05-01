import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./Navbar";

export default function Home() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const [getItem, setItem] = useState([]);
  const [getStore, setStore] = useState([]);

  // Used to convert store_id to it's name, but is can result in error when loading. So not using this for now
  const getCoreStore = (id) => {
    let found = getStore.find((item) => {
      return item.id == id;
    });
    if (!found) {
      return "Loading...";
    }
    return found.name;
  };

  useEffect(() => {
    axios
      .get("https://be-unv-nahl.vercel.app/item")
      .then((e) => {
        console.log(e.data);
        setItem(e.data.payload);
      })
      .catch((e) => {
        console.error(e);
      });

    setTimeout(() => {}, 1000);

    axios
      .get("https://be-unv-nahl.vercel.app/store/getAll")
      .then((e) => {
        console.log(e.data);
        setStore(e.data.payload);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={`h-screen w-full font-jetbrains ${theme} flex flex-col`}>
      <Navbar />
      <div className={`grid grid-cols-4 ${theme}`}>
        {getItem.map((item, id) => {
          return (
            <div className="bg-blue-900 rounded-xl m-4 flex flex-col items-center text-white">
              <img className="h-36 m-2" src={item.image_url} />
              <div className="w-full m-2 p-2 flex flex-col">
                <p>{`Name: ${item.name}`}</p>
                {/* Old line to translate store_id to name. Prone to page loading error. Have no intention of fixing this currently. */}
                {/* Shiii I seem to fix it */}
                <p>{`Store: ${getCoreStore(item.store_id)}`}</p>
                {/* <p>{`Store: ${item.store_id}`}</p> */}
                <p>{`Price: $${item.price}`}</p>
                <p>{`Stock: ${item.stock}x`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
