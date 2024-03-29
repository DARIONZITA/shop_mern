import React from "react";

import AboutUs from "../pages/customer/home/AboutUs";
import Hero from "../pages/customer/home/Hero";
import Trending from "../pages/customer/home/Trending";
import Collection from "../pages/customer/home/Collection";
import Article from "../pages/customer/home/Article";
import Follow from "../pages/customer/home/Follow";

export const HomeLayout = () => {
  return (
    <>
      <Hero />
      <Trending />
      <Collection />
     
      <AboutUs />
      <Article />
      <Follow />
    </>
  );
};
