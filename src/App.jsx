import React, { useEffect, useState } from "react";
import "../src/App.css";
import { Route, Routes, useLocation } from "react-router-dom";





import Cookies from 'js-cookie';


import ScrollToTop from "./component/ScrollToTop";
import Home from "./pages/home/Home";
import OPDFeedback from "./pages/home/OPDFeedback";



// import { io } from "socket.io-client";

// const socket = io("http://localhost:8000", {
//   transports: ["polling"], 
//    withCredentials: true, 
// });

function App() {
  const user = Cookies.get("user");

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to Socket.IO server");
  //   });
  // }, []);

  return (
    <>
  
      <div className="w-100 font-Poppins ease-soft-spring h-[100%]  !bg-[#fbffff]  duration-1000 ">

<ScrollToTop />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<OPDFeedback />} />

          
          











     


          



        </Routes>

      </div>
    </>
  );
}

export default App;
