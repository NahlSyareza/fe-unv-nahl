import Navbar from "./Navbar";

import add from "../assets/add.svg";
import search from "../assets/search.svg";
import marker from "../assets/marker.svg";
import del from "../assets/delete.svg";
import update from "../assets/update.svg";

import { useNavigate } from "react-router-dom";

export default function Items() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const navigate = useNavigate();

  const elements = [
    { id: "add_item", name: "Add Item", logo: add },
    { id: "get_item_id", name: "Get Item by ID", logo: search },
    { id: "get_items_store", name: "Get Items by Store", logo: marker },
    { id: "update_item", name: "Update Item", logo: update },
    { id: "delete_item", name: "Delete Item", logo: del },
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
