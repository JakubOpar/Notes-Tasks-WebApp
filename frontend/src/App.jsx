import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";

// Import komponentów dla notatek
import CreateNote from "./Pages/Notes/Create";
import ShowNote from "./Pages/Notes/Show";
import UpdateNote from "./Pages/Notes/Update";

import "./App.css";

export default function App() {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          {/* Ścieżki dla notatek */}
          <Route path="/notes" element={<ShowNote />} />
          <Route path="/notes/create" element={user ? <CreateNote /> : <Login />} />
          <Route path="/notes/:id" element={<ShowNote />} />
          <Route path="/notes/update/:id" element={user ? <UpdateNote /> : <Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}