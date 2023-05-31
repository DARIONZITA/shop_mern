import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";
import Navbar from "../components/navbarCustomer/Navbar";
import FacebookChat from "../components/chatFb";


export const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <NewsLetter />
      <FacebookChat />
      <Footer />
    </>
  );
};
