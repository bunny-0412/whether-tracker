import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "../components/Loginpage";
import Dashboard from "../components/Dashboard";
import Whetherpage from "../whethercompo/Whetherpage";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Loginpage />} />
    //     <Route path="/Home" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>
    <Whetherpage/>
  );
}
