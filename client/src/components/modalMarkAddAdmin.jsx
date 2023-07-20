
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateMarks, getAllMarks } from '../features/auth/customerAuthSlice';


export const AddMark=(props)=>{
    
    const {open,handleClose,lat,lan}=props
    const dispatch=useDispatch()
    
    const [name,setName]=useState('')
    
    const [latitude, setLatitude]=useState(lat? lat : '')    

    const [longitude,setLongitude]=useState(lan? lan : '')
    
    const create=()=>{
        const data={name,coordinates:[Number(latitude),Number(longitude)]}
        dispatch(CreateMarks({...data}))
       
        handleClose()
    }
    
    return (
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
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
                        Adicionar novo ponto de Encontro
                    </h2>
                    <input type="text" placeholder="Digite o Nome" className="bg-gray-300 p-5 rounded-xl text-lg" onChange={(e)=>setName(e.target.value)} value={name}/>
                    <label className="p-4 text-larger">
                        Coordenadas: <input type="text" className="bg-gray-300 p-2 rounded-md"  placeholder="Latitude" onChange={(e)=>setLatitude(e.target.value)} value={latitude}/> ,
                         <input type="text" className="bg-gray-300 p-2 rounded-md" placeholder="Longetude" onChange={(e)=>setLongitude(e.target.value)} value={longitude}/>
                    </label>
                    <button 
                        className='btn-secondary bg-blue-500 disabled:bg-gray-500 '  
                        onClick={create} 
                        disabled={((longitude==='') || (latitude==='') || (name===''))}
                        >Criar
                        </button>
                
                    </div>
                </div>
                
                </Fade>
            </Modal>
    )
}