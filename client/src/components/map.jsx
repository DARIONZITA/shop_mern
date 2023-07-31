import React, { useEffect, useState,useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import CircularProgress from '@mui/material/CircularProgress';
import {setPlaceAndfrete} from "../features/customer/cart/cartSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { MapPattern } from './mapPattern.jsx';
import { getAllMarks } from '../features/auth/customerAuthSlice.js';

function Map() {
  
      
  const dispatch = useDispatch();

  
  const {loading,dataMarks,markStatus}= useSelector(store => store.customer);

  const [myCoordinates, setMyCoordinates] = useState(null);
  const [distance, setDistance]=useState()
  const [isLoading, setIsLoading]=useState(false)
  const geoMarker=dataMarks? dataMarks.marksData : [] 
  const [showMapa, setShowMapa]=useState(false)
  
  const handleMarkerClick = (placeName, coordinates) => {
    dispatch(setPlaceAndfrete({
      selectedPlace:{
        placeName,
        coordinates
      }
      }));
      setShowMapa(false)
  };
  const handleCloseMapa=()=>setShowMapa(false)
  const getMycoordinates = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setIsLoading(false)
          setMyCoordinates({ latitude: lat, longitude: lon });
        },
        (error) => {
          console.error(error.message);
        }
      );
      //calcula a diferença
   
    } else {
      console.error('Geolocalização não é suportada pelo seu navegador.');
    }
  }
  

  useEffect(()=>{
    if(distance){
   
      const minDistance=distance.reduce((a,b)=>Math.min(a,b))
      const minPosition=distance.indexOf(minDistance)
      handleMarkerClick(geoMarker[minPosition].name,geoMarker[minPosition].coordinates)
    }
    
  },[distance])

  
  
  useEffect(()=>{
    if(markStatus==='idle'){
      dispatch(getAllMarks())
    }
    if(geoMarker && myCoordinates){  
      
      setDistance(geoMarker.map((feature,key)=>{
        return ((feature.coordinates[0]-myCoordinates.latitude)**2+(feature.coordinates[1]-myCoordinates.longitude)**2)**1/2
      }))
      }
  },[myCoordinates])



  return (
    <>
    <div className='flex justify-around flex-wrap'>
      <button 
        className='p-4 m-2 bg-blue-600 md:text-base text-sm text-white rounded-lg' 
        onClick={getMycoordinates}>{isLoading? <CircularProgress size={20} color='secondary'/>:`Ponto de encontro automático`}</button>
      <button className='p-4 m-2 bg-neutral-600 md:text-base text-sm text-white rounded-lg' onClick={()=>setShowMapa(true)}>Ponto de encontro no mapa</button>
    </div>
    <MapPattern showMapa={showMapa} myCoordinates={myCoordinates} handleMarkerClick={handleMarkerClick} handleCloseMapa={handleCloseMapa} />
    </>

  );
}

export default Map;