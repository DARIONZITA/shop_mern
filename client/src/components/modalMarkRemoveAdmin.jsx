
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveMark, getAllMarks } from '../features/auth/customerAuthSlice';

export const RemoveMarkModal=({open,handleClose,name,id})=>{
    const dispatch=useDispatch()
    const removeMark=()=>{
        
        dispatch(RemoveMark(id))
        
    }

    return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Fade in={open}>
                <div className='w-screen h-screen grid justify-center absolute content-center
                '>
                    <div className=' p-6 bg-white border-black border-solid border-2 h-min max-w-2xl grid'>
                    <button onClick={handleClose} className='justify-self-end'><CloseIcon /></button>
                    <h2 className='text-lg m-5 text-center font-bold'>
                        Remover ponto de Encontro
                    </h2>
                    
                    <p>Deseja Remover o ponto {name}</p>
                    <div className='flex justify-between'>
                        
                        <button className='btn-primary' onClick={handleClose}>Cancelar</button>
                        <button className='btn-primary bg-red-300 hover:bg-red-700 hover:text-white' onClick={()=>removeMark()}>Apagar</button>
                    
                    </div>
                    </div>
                </div>
                
                </Fade>
            </Modal>
            
    )
}