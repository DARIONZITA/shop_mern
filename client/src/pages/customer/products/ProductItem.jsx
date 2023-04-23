import React from "react";

import Button from "../../../components/Button";

import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddItemToCart } from "../../../features/customer/cart/cartSlice";

const ProductItem = () => {
  const { state } = useLocation();
  const { item } = state;
  const { _id, category, name, price, imgOne, imgTwo } = item;

  const dispatch = useDispatch();

  console.log(item);

  const handleAddToCart = () => {
    const items = { _id, category, name, price, imgOne, imgTwo };

    dispatch(setAddItemToCart(items));
  };

  function formatPrice(price) {
    // Get the user's locale from the browser
    const userLocale = navigator.language || "en-US";

    // Format the price value using the user's locale and currency
    const formattedPrice = Number(price).toLocaleString(userLocale, {
      style: "currency",
      currency: "USD",
    });

    return formattedPrice;
  }

  return (
    <main className="min-h-screen w-full bg-[#FFFFFF]">
      <div className="container mx-auto space-y-16 py-6 px-6 md:space-y-32 md:pb-32 lg:px-16">
        <div className="mt-20 space-y-12 ">
          <div className="items-center justify-center space-y-4 md:flex">
            {/* img */}
            <div className="group relative flex h-72 w-full justify-center">
              <img
                className="absolute h-72 max-w-xs object-cover transition duration-500 ease-in-out group-hover:opacity-0"
                src={item.imgOne.url}
                alt={item.name}
              />

              <img
                className="absolute h-72 max-w-xs rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100"
                src={item.imgTwo.url}
                alt={item.name}
              />
            </div>

            {/* name */}
            <div className="flex w-full flex-col justify-center space-y-4 text-left">
              <div className="flex flex-col space-y-4">
                <p className="font-urbanist text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
                  {item.name}
                </p>

                <span className="inline-block font-gotu text-lg text-secondary md:text-2xl lg:text-3xl">
                  {formatPrice(item.price)}
                </span>
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  navigateTo="/products"
                  btnStyle="btn-primary"
                  text="Back"
                />

                <button onClick={handleAddToCart} className="btn-secondary">
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="border-b pb-2 font-urbanist text-xl font-bold text-primary md:text-2xl lg:text-3xl">
              Description
            </h2>

            <div className="space-y-3 pl-6">
              {item.description.map((desc, index) => {
                return (
                  <p
                    key={index}
                    className="text-small font-urbanist text-secondary md:text-base lg:text-lg"
                  >
                    <span className="mr-1 font-semibold">{desc.detailOne}</span>
                    {desc.detailTwo}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductItem;
