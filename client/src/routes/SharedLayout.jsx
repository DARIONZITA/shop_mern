import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/navbarCustomer/Navbar";
export const SharedLayout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
     
    </>
  );
};
