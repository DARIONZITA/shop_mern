
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMarks } from '../features/auth/customerAuthSlice';
import { CircularProgress } from '@mui/material';
import { RemoveMarkModal } from './modalMarkRemoveAdmin';

export const SearchMarks=({open,handleClose})=>{
    const {loading,dataMarks,markStatus}= useSelector(store => store.customer);
    const [search,setSearch]=useState('')
    const [dataForRemove,setDataForRemove]=useState({})
    const [openConfirm,setOpenConfirm]=useState(false)
    const handleCloseConfirm=()=>{
        
        setOpenConfirm(false)
    }

    const handleClick =(name,id)=>{
        setDataForRemove({name,id})
        setOpenConfirm(true)
        
    }

    const dispatch=useDispatch()
  
    useEffect(()=>{
      if(search==='' && markStatus==='idle'){
          dispatch(getAllMarks())
        }
    },[search])
    
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
                    <p>Total : {dataMarks?.total} pontos</p>
                    
                    <input className="bg-slate-300 rounded-lg p-4" placeholder="Pesquisar Ponto" type="search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                    <ul className='overflow-y-auto h-40 p-4 text-center'>
                        {(loading && dataMarks)? <CircularProgress />  : dataMarks?.marksData.filter((mark)=>(mark.name.toLowerCase()).search(search.toLowerCase()) !== -1).map((mark)=>(
                            <li key={mark._id} className='hover:bg-red-600 hover:text-white text-lg p-2 rounded-sm cursor-pointer' onClick={()=>handleClick(mark.name,mark._id)}>{mark.name}</li>
                        ))}
                    </ul>
                    <RemoveMarkModal open={openConfirm} handleClose={handleCloseConfirm} name={dataForRemove.name} id={dataForRemove.id}/>
                
                    </div>
                </div>
                
                </Fade>
            </Modal>
            
    )
}