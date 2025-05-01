import Navbar from "./Navbar";

import { useNavigate } from "react-router-dom";

import add from "../assets/add.svg";
import search from "../assets/search.svg";
import marker from "../assets/marker.svg";
import del from "../assets/delete.svg";
import update from "../assets/update.svg";

export default function Stores() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const navigate = useNavigate();

  const elements = [
    { id: "add_store", name: "Add Store", logo: add },
    { id: "get_store_id", name: "Get Store by ID", logo: search },
    { id: "get_store", name: "Get Stores", logo: marker },
    { id: "update_store", name: "Update Store", logo: update },
    { id: "delete_store", name: "Delete Store", logo: del },
  ];

  return (
    <div className={`h-screen w-full font-jetbrains ${theme} flex flex-col`}>
      <Navbar />
      <div className="self-center w-4/6 grid grid-cols-4 m-8">
        {elements.map((item, index) => {
          return (
            <button
              className="p-4 w-48 aspect-square bg-blue-500 m-2 rounded-xl mx-auto flex flex-col"
              onClick={() => {
                navigate(`${item.id}`);
              }}
            >
              <img className="w-1/4 h-1/4 self-center m-8" src={item.logo} />
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
