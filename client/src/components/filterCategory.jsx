import {FormControlLabel,RadioGroup,Checkbox} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { setFilterCategory } from '../features/customer/product/productCustomerSlice';

const FilterCategory=({ onClickCat, products ,categoryStatic})=>{
    const [listCat,setListCat] = useState([])
    const dispatch = useDispatch()
  
    useEffect(()=>{
      if(onClickCat){
        onClickCat(listCat)
      }
      else{
        dispatch(setFilterCategory(listCat))

      }
    },[listCat])
    return(
        
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

        {/*products.categories?.map((cat) => (
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
        ))*/}
        </RadioGroup>
        
    )
}
 export default FilterCategory