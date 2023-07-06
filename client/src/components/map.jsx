import React, { useEffect, useState,useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import CircularProgress from '@mui/material/CircularProgress';
import {setPlaceAndfrete, setShowMapa} from "../features/customer/cart/cartSlice.js"

import { useDispatch, useSelector } from "react-redux";
import { MapPattern } from './mapPattern.jsx';

function Map() {
  
      
  const dispatch = useDispatch();


  const [myCoordinates, setMyCoordinates] = useState(null);
  const [distance, setDistance]=useState()
  const [isLoading, setIsLoading]=useState(false)
  const [geoMarker, setGeoMarker]= useState()

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
      handleMarkerClick(geoMarker[minPosition].properties.name,geoMarker[minPosition].geometry.coordinates)
    }
    
  },[distance])
  useEffect(() => {
    
    fetch('../LuandaMarkers.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoMarker(data.features)
      })
      .catch(error => {
        console.log('Error fetching GeoJSON:', error);
      });
    
  }, [])
  
  
  useEffect(()=>{
    if(geoMarker && myCoordinates){  
      
      setDistance(geoMarker.map((feature,key)=>{
        return ((feature.geometry.coordinates[0]-myCoordinates.latitude)**2+(feature.geometry.coordinates[1]-myCoordinates.longitude)**2)**1/2
      }))
      }
  },[myCoordinates])



  return (
    <>
    <div className='flex justify-around'>
      <button 
        className='rounded-lg p-4 bg-blue-400 text-ms' 
        onClick={getMycoordinates}>{isLoading? <CircularProgress size={20} color='secondary'/>:`Ponto de encontro automático`}</button>
      <button className='p-4 bg-neutral-600 text-ms text-white rounded-lg' onClick={()=>setShowMapa(true)}>Ponto de encontro no mapa</button>
    </div>
    <MapPattern showMapa={showMapa} myCoordinates={myCoordinates} handleMarkerClick={handleMarkerClick} />
    </>

  );
}

export default Map;