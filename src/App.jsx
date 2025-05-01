import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Items from "./pages/Items";
import Stores from "./pages/Stores";

import AddStore from "./pages/AddStore";

import AddItem from "./pages/AddItem";
import GetItemId from "./pages/GetItemId";
import GetItemsStore from "./pages/GetItemsStore";

export default function App() {
  localStorage.setItem("theme", "dark");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/items" element={<Items />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/add_store" element={<AddStore />} />
        <Route path="/items/add_item" element={<AddItem />} />
        <Route path="/items/get_item_id" element={<GetItemId />} />
        <Route path="/items/get_items_store" element={<GetItemsStore />} />
      </Routes>
    </BrowserRouter>
  );
}
