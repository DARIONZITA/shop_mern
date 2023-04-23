import React, { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminProduct,
  readAdminProducts,
  setClearErrors,
  setCurrentId,
  setFilterCategory,
  setSearch,
  setSortOrder,
} from "../../features/admin/product/productAdminSlice";

export const AdminProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewProduct, setViewProduct] = useState(false);
  const [viewSingleProduct, setViewSingleProduct] = useState(null);

  const dispatch = useDispatch();

  const { admin } = useSelector((store) => store.admin);

  const {
    products,
    sortOrder,
    search,
    filterCategory,
    currentId,
    loadingDelete,
  } = useSelector((store) => store.productsAdmin);

  console.log(products);

  useEffect(() => {
    if (admin) {
      dispatch(readAdminProducts(admin));
    }
  }, [sortOrder, search, filterCategory, admin]);

  const onClickCat = (cat) => {
    dispatch(setFilterCategory(cat));
  };

  const handleSortOrderChange = (event) => {
    dispatch(setSortOrder(event.target.value));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearch(event.target.value));
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteAdminProduct(id));
      dispatch(setClearErrors());
    }
  };

  // gets the id
  const handleEdit = (id) => {
    if (currentId === id) {
      dispatch(setCurrentId(id));
    } else {
      dispatch(setClearErrors());
      dispatch(setCurrentId(id));
    }
  };

  // view product
  const handleView = (product) => {
    setViewSingleProduct(product);
    setViewProduct(true);
  };

  // using reduce
  // const categoryTotal = filteredProducts.reduce((counts, product) => {
  //   counts += 1;

  //   return counts;
  // }, 0);

  //  simplified one
  // const categoryTotal = filteredProducts.length;

  const { categoryCount, categoryTotal } = (
    products.productsData || []
  )?.reduce(
    (count, product) => {
      const category = product.category;
      const index = count.categoryCount.findIndex(
        (obj) => obj.category === category
      );

      if (index >= 0) {
        count.categoryCount[index].count += 1;
      } else {
        count.categoryCount.push({ category: category, count: 1 });
      }

      count.categoryTotal += 1;

      return count;
    },
    {
      categoryCount: [],
      categoryTotal: 0,
    }
  );

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
    <div className="col-span-2 max-h-[850px] space-y-5 overflow-y-auto bg-pink-200 p-5 font-urbanist">
      {/* filter navs */}
      <div>
        <ul className="flex justify-center space-x-3 text-base font-bold tracking-wide text-bgcolor3 md:text-lg lg:text-xl">
          <li
            className="cursor-pointer rounded-lg bg-[#535144] py-3 px-5 shadow-lg transition duration-300 ease-in-out hover:bg-[#3f3e36]"
            onClick={() => onClickCat("All")}
          >
            All Product
          </li>

          {products.categories?.map((cat) => (
            <li
              className={`cursor-pointer rounded-lg bg-${
                cat == "Green Tangerine" && "[#6b660f]"
              } bg-${cat == "Apple Aha" && "[#E8545C]"} bg-${
                cat == "Heart Leaf" && "[#aaa80f]"
              } py-3 px-5 shadow-lg transition duration-300 ease-in-out hover:bg-${
                cat == "Green Tangerine" && "[#615d0d]"
              } hover:bg-${cat == "Apple Aha" && "[#dd434b]"} hover:bg-${
                cat == "Heart Leaf" && "[#9c9a0d]"
              }`}
              key={cat}
              onClick={() => onClickCat(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* dropdown */}
      <div className="flex items-center space-x-3">
        <select
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="rounded shadow-lg focus:outline-none md:py-2 md:px-2"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <div className="relative font-urbanist">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
            <FiSearch className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-4 px-11 text-sm text-gray-900 focus:outline-none"
            placeholder="Search Products, etc..."
          />
        </div>

        {/* <span>{products.length} Products</span> */}

        {filterCategory === "All" ? (
          categoryCount.length > 0 ? (
            <p className="font-bold text-secondary">
              There are a total of {categoryTotal} products.
            </p>
          ) : (
            <p className="font-bold text-secondary">Product not available.</p>
          )
        ) : (
          <>
            {categoryCount.length > 0 ? (
              categoryCount
                .filter((count) => count.category === filterCategory)
                .map((count, i) => (
                  <p key={i} className="font-bold text-secondary">
                    There are {count.count} {count.category} products.
                  </p>
                ))
            ) : (
              <p>Product not available.</p>
            )}
          </>
        )}
      </div>

      {/* products */}

      {!viewProduct ? (
        <div className="grid grid-cols-2 gap-9 md:grid-cols-3 ">
          {products.productsData?.map((product) => (
            <div key={product._id} className="space-y-3 text-center ">
              {/*  img */}
              <div className="group relative flex h-52 justify-center md:h-64">
                <img
                  className="absolute h-52 object-cover transition duration-500 ease-in-out group-hover:opacity-0 md:h-64"
                  src={product.imgOne.url}
                  alt={product.imgOne.url}
                />

                <img
                  className="absolute h-52 rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 md:h-64"
                  src={product.imgTwo.url}
                  alt={product.imgTwo.url}
                />
              </div>
              {/*  name */}
              <div className="flex h-16 items-center justify-center">
                <p className="font-urbanist text-base text-secondary md:text-lg lg:text-xl">
                  {product.name}
                </p>
              </div>
              {/*  price & view */}
              <div className="flex items-center justify-center gap-3">
                <span className="font-urbanist text-base font-bold text-secondary md:text-lg lg:text-xl">
                  {formatPrice(product.price)}
                </span>

                <button
                  type="button"
                  onClick={() => handleView(product)}
                  className="flex cursor-pointer items-center rounded bg-primary py-1 px-2 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">View Product</p>

                  <BsArrowRight className="h-6 w-6 p-1" />
                </button>
              </div>
              {/*  edit & del */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleEdit(product._id)}
                  className="flex cursor-pointer items-center rounded bg-primary py-1 px-2 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">Edit</p>

                  <AiOutlineEdit className="h-6 w-6 p-1" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  className="flex cursor-pointer items-center rounded bg-primary py-1 px-2 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
                >
                  <p className="text-base md:text-[16px]">Delete</p>

                  <MdOutlineDelete className="h-6 w-6 p-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-3">
            <div className="group relative flex h-52 justify-center md:h-64 md:w-64">
              <img
                className="absolute h-52 object-cover transition duration-500 ease-in-out group-hover:opacity-0 md:h-64"
                src={viewSingleProduct.imgOne.url}
                alt={viewSingleProduct.imgOne.url}
              />

              <img
                className="absolute h-52 rounded-lg object-cover opacity-0 shadow-xl transition duration-500 ease-in-out group-hover:opacity-100 md:h-64"
                src={viewSingleProduct.imgTwo.url}
                alt={viewSingleProduct.imgTwo.url}
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              <p className="font-urbanist text-base text-secondary md:text-lg lg:text-xl">
                {viewSingleProduct.name}
              </p>

              <span className="font-urbanist text-base font-bold text-secondary md:text-lg lg:text-xl">
                {formatPrice(viewSingleProduct.price)}
              </span>

              <button
                type="button"
                onClick={() => setViewProduct(false)}
                className="flex cursor-pointer items-center rounded bg-primary py-1 px-2 text-bgcolor transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary"
              >
                <p className="text-base md:text-[16px]">Back</p>

                <BsArrowRight className="h-6 w-6 p-1" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="border-b pb-2 font-urbanist text-xl font-bold text-primary md:text-2xl lg:text-3xl">
              Description
            </h2>

            <div className="space-y-3 pl-6">
              {viewSingleProduct.description.map((desc, i) => (
                <p
                  key={i}
                  className="text-small font-urbanist text-secondary md:text-base lg:text-lg"
                >
                  <span className="mr-1 font-semibold">{desc.detailOne}</span>
                  {desc.detailTwo}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
