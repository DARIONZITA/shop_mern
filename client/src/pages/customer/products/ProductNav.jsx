import React, { useEffect, useState } from "react";
import Slider from '@mui/material/Slider';
import {FormControlLabel,RadioGroup,Radio,Checkbox} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch } from "react-redux";
import { readCustomerProducts, setFilterCategory, setFilterPrice } from "../../../features/customer/product/productCustomerSlice";

function valuetext(value) {
  return `${value} Kz`;
}
const marks = [
  {
    value: 0,
    label: '0 kz',
  },
  {
    value: 50000,
    label: '50 000 KZ',
  },
];

export const ProductNav = ({ onClickCat, products ,categoryStatic}) => {
  const [listCat,setListCat] = useState([])
  const [maxPrice, setMaxPrice] = useState(50000)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(setFilterPrice(maxPrice))
  },[maxPrice])



  useEffect(()=>{
    dispatch(setFilterCategory(listCat))
  },[listCat])
  return (
    <div className="hidden text-center md:block md:space-y-5 md:text-left">
      <h2 className="font-urbanist text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
        Produtos
      </h2>

      <div className="px-3 font-urbanist text-base text-secondary md:text-lg lg:text-xl">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          >
        {categoryStatic.map((data)=>{
         
            return (
              <>
                <FormControlLabel  
                value={data[0]} 
                control={
                  <Checkbox 
                    onChange={(e)=>{
                      if(e.target.checked){
                        setListCat((prev)=>[...prev,data[0]])
                    
                      }
                      else{
                        setListCat((prev)=>prev.filter((category)=>category!==data[0]))
                      }
                    
                    }}
                    icon={<RadioButtonUncheckedIcon />} 
                    checkedIcon={<RadioButtonCheckedIcon color="secondary"/>} />} 
                      label={data[0]} />
                {(listCat.includes(data[0])) && data[1].map((item)=>(    
                  <div className="pl-5 hover:bg-red-500 hover:text-white rounded-xl">
                    <FormControlLabel  
                      value={item} 
                      control={
                        <Checkbox 
                          onChange={(e)=>{
                            if(e.target.checked){
                              setListCat((prev)=>[...prev,item])

                          
                            }
                            else{
                              setListCat((prev)=>prev.filter((category)=>category!==item))
                            }
                          
                          }}
                          icon={<RadioButtonUncheckedIcon />} 
                          checkedIcon={<RadioButtonCheckedIcon color="warning"/>} />} 
                            label={item} />
                  </div>       
                   ))
                  }

              </>
            
            )
          
   
        }
          
        )}
        {products.categories?.map((cat) => (
          <li
            className={`cursor-pointer rounded-lg py-3 px-5 transition duration-300 ease-in-out ${
              cat === "Green Tangerine" && "hover:bg-green_tangerine"
            } ${cat === "Apple Aha" && "hover:bg-apple_aha"} ${
              cat === "Heart Leaf" && "hover:bg-heart_leaf"
            } ${
              cat === "Apricot Collagen" && "hover:bg-apricot_collagen"
            } hover:text-bgcolor2`}
            key={cat}
            onClick={() => onClickCat(cat)}
          >
            
            {cat}
          </li>
        ))}
        </RadioGroup>
        <div className="m-4">
          <p className="font-semibold">Filtrar por preço</p>
          <Slider
            aria-label="Temperature"
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={5000}
            marks={marks}
            min={0}
            value={maxPrice}
            onChange={(e)=>setMaxPrice(e.target.value)}
            max={50000}
            />
        </div>
      </div>

    </div>
  );
};
