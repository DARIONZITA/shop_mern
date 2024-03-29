import {useState,memo} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Steps from './stepsOrder';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'


 const ModalOrder=() => {
  const [openModal,setOpen]=useState(false) 
  const customer= useSelector((store)=>store.customer.customer)
  const cartTotalQuantity= useSelector((store)=>store.cart.cartTotalQuantity)
  const dispatch= useDispatch()
  const handleOpen = () => {
      
      setOpen(true)

    
   };
  const handleClose = () =>setOpen(false);
  const sty='rounded border bg-slate-100 border-black p-4 m-4 overflow-y-auto h-60'
  return (

    <div>
      {
        customer ? (  
        <button 
          disabled={cartTotalQuantity===0} 
          className='rounded bg-blue-600 py-2 px-3 text-sm text-white transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary md:text-base disabled:bg-slate-400' 
          onClick={handleOpen}>
            Encomendar
        </button>   
        ):(
          <Link 
            onClick={()=> dispatch(
              setCloseCart({
                cartState: false
              })
              )
            }
            to="/customer/login">
            <button 
              
              className='rounded bg-blue-600 py-2 px-3 text-sm text-white transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary md:text-base' 
              >
            Encomendar
          </button>
          </Link>
           
        )

      }
      
      <Modal  
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <div className='w-screen h-screen grid justify-center absolute content-center
          '>
             <div className=' p-6 bg-white border-black border-solid border-2 h-min max-w-2xl grid'>
            <button onClick={handleClose} className='justify-self-end'><CloseIcon /></button>
            <h2 className='text-lg m-5 text-center font-bold'>
              Faça a sua encomenda
            </h2>
         
            <Steps handleCloseModal={handleClose}/>

           
            </div>
          </div>
         
        </Fade>  
      </Modal>
    </div>
  );
}
export default memo(ModalOrder) 