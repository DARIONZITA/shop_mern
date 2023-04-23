import React from "react";

export const ProductNav = ({ onClickCat, products }) => {
  return (
    <div className="hidden text-center md:block md:space-y-5 md:text-left">
      <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
        Products
      </h2>

      <ul className="px-3 font-urbanist text-base text-secondary md:text-lg lg:text-xl">
        <li
          className="cursor-pointer rounded-lg py-3 px-5 transition duration-300 ease-in-out hover:bg-[#3f3e36] hover:text-bgcolor2"
          onClick={() => onClickCat("All")}
        >
          All
        </li>
        {products.categories?.map((cat) => (
          <li
            className={`cursor-pointer rounded-lg py-3 px-5 transition duration-300 ease-in-out hover:bg-${
              cat == "Green Tangerine" && "green_tangerine"
            } hover:bg-${cat == "Apple Aha" && "apple_aha"} hover:bg-${
              cat == "Heart Leaf" && "heart_leaf"
            } hover:bg-${
              cat == "Apricot Collagen" && "apricot_collagen"
            } hover:text-bgcolor2`}
            key={cat}
            onClick={() => onClickCat(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};
