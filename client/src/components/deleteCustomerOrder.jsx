import React, { useState } from "react";

//materials
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {DialogTitle,DialogContentText,DialogContent,DialogActions,Dialog,TextField,Button,Fade,} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Popover from '@mui/material/Popover';

import { useDispatch, useSelector } from "react-redux";



// icons

import DeleteIcon from '@mui/icons-material/Delete';


import { CancelOrder } from "../features/auth/customerAuthSlice";
import { readCustomerProducts } from "../features/customer/product/productCustomerSlice";


export default function CancelMyOrder(){
    const dispatch = useDispatch()
    const [textConfirm, setTextConfirm] = useState('')
    const [openConfirm, setOpenConfirm] = useState(null);
  
    const { cartState, cartTotalQuantity,myOrderStatus } = useSelector((store) => store.cart);
    const { customer, orderPending, ordersStatus} = useSelector((store) => store.customer);
    const { products, search, categoryStatic } = useSelector((store) => store.productsCustomer);

    const [anchorEl, setAnchorEl] = useState(null);

    const openOrder = Boolean(anchorEl);
    const id = openOrder ? 'simple-popover' : undefined;
    const cancelOrder=(idOrder) => { 
        dispatch(CancelOrder(idOrder))
        dispatch(readCustomerProducts())
        setOpenConfirm(null);
        setTextConfirm('')     
      }
    const handleClickOpen = (key,orderId) => {
        

    setOpenConfirm({key,orderId});
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(null);
        setTextConfirm('')
      };
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleCloseOrder = () => {
        setAnchorEl(null);
      };
    

    return(
        <>
             <IconButton
                      aria-describedby={id} 
                      variant="contained" 
                      onClick={handleClick}
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit">
                      <Badge badgeContent={orderPending.length} color="success">
                        <NotificationsIcon />
                      </Badge>
                 </IconButton>
                 <Popover
            
                    id={id}
                    open={openOrder}
                    anchorEl={anchorEl}
                    onClose={handleCloseOrder}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    
                  <div className="grid w-96 max-w-full p-4 max-h-[70vh]">
                    {orderPending.map((oneOrder,k)=>( 
                    
                  <div key={`${oneOrder._id} ${k}`} className="relative p-2 m-4  bg-slate-200 rounded-md">
                    
                    <div className="relative">
                      <span className="absolute -top-3 right-0 md:right-4 z-20">
                        <IconButton
                          onClick={() => handleClickOpen(k,oneOrder._id)}
                          aria-label="delete" 
                          color="error">
                          <DeleteIcon fontSize='medium' />
                        </IconButton>
                      </span>
                      <h1 className=" text-center font-semibold text-lg m-2 text-gray-600 pt-8 md:pt-0">
                        <hr /> 
                        Encomenda {k+1}
                      </h1>
                      
                    
                      

                    </div>
                          
                        <span className="absolute opacity-70 top-0 left-0 md:left-4 bg-gray-800  rounded-md p-2 m-2 md:text-lg text-white text-bold z-20">{oneOrder.prices.priceTotal} Kz</span>
                        <div className=" max-h-32 overflow-y-auto border-solid border-[0.2] border-gray-400 shadow-inner shadow-gray-400 rounded-md" >
                        
                          {oneOrder.products.map((product,key)=>(
                          <>
                          {product.productId && (
                          <div key={Math.log10(key)} className="flex justify-between m-4 font-semibold pr-2">
                       
                          <span>
                            {product.productId.name}
                          </span>
                          <span>
                            {product.quantity}
                          </span>
                          </div>
                        )}
                          </>
                        
                        ))}
                        </div>
                     </div>
                     
                    )
                  )}

                  </div>
                  </Popover>
                  {(openConfirm!==null) && (
                    <div>
                    <Dialog open={openConfirm!==null} onClose={handleCloseConfirm}>
                      <DialogTitle>Cancelar encomenda</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Para cancelares esta encomenda digite <strong>Encomenda {openConfirm.key + 1}</strong>
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="name"
                          value={textConfirm}
                          onChange={(e)=>setTextConfirm(e.target.value)}
                          label="Digite aqui"
                          type="text"
                          fullWidth
                          color="error"
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button color="warning" onClick={handleCloseConfirm}>Cancelar</Button>
                        <Button disabled={textConfirm!==`Encomenda ${openConfirm.key + 1}`} color="warning" onClick={()=>cancelOrder(openConfirm.orderId)}>Confirmar</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  )}
        </>
    )
}