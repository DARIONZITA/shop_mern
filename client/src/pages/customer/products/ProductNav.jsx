import React, { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from "react-redux";
import { readCustomerProducts, setFilterPrice } from "../../../features/customer/product/productCustomerSlice";
import FilterCategory from "../../../components/filterCategory";
import { ProductSearch } from "./ProductSearch";

function valuetext(value) {
  return `${value} Kz`;
}
const marks = [
  {
    value: 0,
    label: '0 kz',
  },
  {
    value: 25000,
    label: '25 000 KZ',
  },
];

export const ProductNav = ({ onClickCat, products ,categoryStatic}) => {
  const [maxPrice, setMaxPrice] = useState(50000)
  const filterPrice=useSelector((store)=>store.productsCustomer.filterPrice)
  
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(setFilterPrice(maxPrice))
  },[maxPrice])
  useEffect(()=>{
    dispatch(readCustomerProducts())
  },[filterPrice])

  let resultCategory= categoryStatic 
  if (products?.categories) {
    resultCategory = categoryStatic.filter((category) => {
      const categoryName = category[0];
    
      return products.categories.includes(categoryName) 
    })
    resultCategory=resultCategory.map((category)=>{
      const subCategories = category[1].filter((subCategory) => {
        return products.categories.includes(subCategory);
      });
      return [category[0],subCategories]

    })
  }
  
  
  

  return (
    <div className="hidden text-center md:block md:space-y-5 md:text-left">
      <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
        Produtos
      </h2>

      <div className="px-3 font-urbanist text-base text-secondary md:text-lg lg:text-xl">
        <FilterCategory onClickCat={onClickCat} products={products} categoryStatic={resultCategory}/>  
      <div className="m-4">
          <p className="font-semibold">Filtrar por preço</p>
          <Slider
            aria-label="Temperature"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1000}
            marks={marks}
            min={0}
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
            max={25000}
            />
        </div>
      </div>

    </div>
  );
};
