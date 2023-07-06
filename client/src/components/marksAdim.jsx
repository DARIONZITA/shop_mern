import { useEffect, useState } from "react";
import { MapPattern } from "./mapPattern"

import { useDispatch, useSelector } from "react-redux";
import { getAllMarks } from "../features/auth/customerAuthSlice";
import { SearchMarks } from "./modelSearchAndRemoveMarks";
import { AddMark } from "./modalMarkAddAdmin";



export const MarksAdmin=()=>{ 
  const [open, setOpen] = useState(false);
  const [openRemove,setOpenRemove]= useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpenRemove(false);
  const handleCloseNew=() => setOpen(false)
  const [showMapa,setShowMapa] = useState(false)
  


  const handleMarkerClick = (placeName, coordinates) => {
    
    
  };
    return (
        <div className="grid gap-5 p-4 justify-center w-screen bg-slate-800 ">
            <button className={showMapa?'btn-primary absolute bg-red-400 top-20 right-20 z-30':'btn-primary'} onClick={()=>setShowMapa((prev)=>!prev)}>{showMapa?`Sair do Mapa`:"Mapa"}</button>
            <MapPattern showMapa={showMapa} myCoordinates={false} handleMarkerClick={handleMarkerClick}/>

            <button className="btn-primary" onClick={()=>setOpenRemove(true)}>Remover Marcador Manualmente</button>
            <button className="btn-primary" onClick={handleOpen}>Adicionar Marcador Manualmente</button>
            <SearchMarks open={openRemove} handleClose={handleClose}/>
            <AddMark open={open} handleClose={handleCloseNew}/>                
            
        </div>
    )
}