import React from "react";

import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";
import axios from "axios";

export default function AddItem() {
  const theme =
    localStorage.getItem("theme") == "dark" ? "bg-slate-700" : "bg-gray-300";

  const navigate = useNavigate();

  const [getArr, setArr] = useState([]);
  const [getId, setId] = useState("");
  const [getImage, setImage] = useState(null);
  const [getName, setName] = useState("");
  const [getPrice, setPrice] = useState(0.0);
  const [getStock, setStock] = useState(0);

  useEffect(() => {
    axios
      .get("https://be-unv-nahl.vercel.app/store/getAll")
      .then((e) => {
        console.log(e.data);
        console.log("Sigma");

        setArr(e.data.payload);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const idInput = (e) => {
    setId(e.target.value);
  };

  const inputImage = (e) => {
    setImage(e.target.files[0]);
  };

  const inputName = (e) => {
    setName(e.target.value);
  };

  const inputPrice = (e) => {
    setPrice(e.target.value);
  };

  const inputStock = (e) => {
    setStock(e.target.value);
  };

  return (
    <div
      className={`h-screen w-screen font-jetbrains flex flex-col items-center text-white ${theme}`}
    >
      <ToastContainer position="bottom-center" autoClose={1000} />
      <Navbar />
      <div className="w-1/3 h-4/6 bg-blue-600 rounded-xl flex flex-col items-center my-auto">
        <div className="m-20">
          <p className="text-2xl">Add Item</p>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-1/2">
            <div className="m-4">
              <p>Store ID</p>
              <select
                className="w-full text-black"
                onChange={(e) => idInput(e)}
                value={getId}
              >
                <option value="" hidden>
                  Select store
                </option>
                {getArr.map((item, id) => {
                  return <option value={item.id}>{item.name}</option>;
                })}
              </select>
            </div>
            <div className="m-4">
              <p>Image</p>
              <input
                className="w-full text-black"
                type="file"
                onChange={inputImage}
              />
            </div>
            <div className="m-4">
              <p>Name</p>
              <input
                className="w-full text-black"
                type="text"
                onChange={inputName}
              />
            </div>
          </div>
          <div className="w-1/2">
            <div className="m-4 ">
              <p>Price</p>
              <input
                className="w-full text-black"
                type="text"
                onChange={inputPrice}
              />
            </div>
            <div className="m-4 ">
              <p>Stock</p>
              <input
                className="w-full text-black"
                type="text"
                onChange={inputStock}
              />
            </div>
          </div>
        </div>
        <div className="m-8 flex-1 flex w-full justify-center items-center">
          <button
            className="p-3 bg-gray-800 rounded-md"
            onClick={async () => {
              if (
                !inputImage ||
                getId.length < 1 ||
                getName.length < 1 ||
                getPrice.length < 1 ||
                getStock.length < 1
              ) {
                toast.error("Fill in ze blanks please");
                return;
              }

              const formData = new FormData();
              formData.append("store_id", getId);
              formData.append("image", getImage);
              formData.append("name", getName);
              formData.append("price", parseInt(getPrice));
              formData.append("stock", parseInt(getStock));

              await axios
                .post(`https://be-unv-nahl.vercel.app/item/create`, formData)
                .then((e) => {
                  console.log(e.data);
                  toast.success("New item added!");
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
