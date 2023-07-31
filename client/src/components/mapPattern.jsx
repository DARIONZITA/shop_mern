import React, { useEffect, useState,useRef } from 'react';
import { MapContainer, TileLayer, Marker,Popup, useMapEvents} from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css';
import {setMunicipioAndDistrito, deleteDistrito,setPlaceAndfrete} from "../features/customer/cart/cartSlice.js"
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { getAllMarks } from '../features/auth/customerAuthSlice.js';
import { AddMark } from './modalMarkAddAdmin.jsx';
import imageIcon from '../assets/gps.png'
import imageIcon2 from '../assets/placeholder.png'
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function UpMarker() {
  const [open, setOpen]=useState(true)
  const handleClose=()=>{
    setOpen(false)
  }

  const customIcon = new Icon({
    iconUrl: imageIcon2,
    iconSize: [45, 45],
    iconAnchor: [32, 32],
  }); 
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    dblclick(e) {
      setOpen(true)
      console.log("double clicked");
      const { lat, lng } = e.latlng;
      setPosition({lat,lng})
       }
    })
  if(position){
    
  }
  return position === null ? null : (
    <>
    <Marker opacity={open ? 0.6 : 0.2} position={position} icon={customIcon}>
      <Popup>Novo ponto aqui</Popup>
    </Marker>
    <AddMark open={open} handleClose={handleClose} lat={position.lat} lan={position.lng}/>
  
    </>
  )
}


export const MapPattern=(props)=>{
  const admin= props.admin ? true : false 
  const {showMapa,myCoordinates, handleMarkerClick,handleCloseMapa}=props
  // Defina o ícone personalizado
  const customIcon = new Icon({
    iconUrl: imageIcon,
    iconSize: [45, 55],
    iconAnchor: [32, 41],
  }); 
  const patternCenter= {
    coordinates:[-8.8218393,13.2699647],
    name: 'Luanda',
    zoom: 11
  }
      
  const dispatch = useDispatch();
  const mapRef = useRef(null);

 
  const {loading,dataMarks,markStatus}= useSelector(store => store.customer);

  const {municipio,municipiosData,distrito} = useSelector((store) => store.cart);
  const [locationCenter,setlocationCenter]=useState(patternCenter)
  const [geojsonData, setGeojsonData] = useState(null); 

  
  const changeMunicipio=(event)=>{
      const {name,coordinates}=JSON.parse(event.target.value)
      const Mzoom= (name=='Icolo e Bengo')||(name=='Quissama') ? 10 : 12
      if(distrito){ dispatch( deleteDistrito( ) ) }
      dispatch(setMunicipioAndDistrito(
      {
       municipio:{
        coordinates,
        name,
        zoom: Mzoom
       }
  
      }
    ))
  }
  const changeDistrito=(event)=>{
    const {name,coordinates}=JSON.parse(event.target.value)
    
    const Dzoom= 15
      dispatch(setMunicipioAndDistrito(
      {
       distrito:{
        coordinates,
        name,
        zoom: Dzoom
       }
  
      }
    ))
  }

  
  if(markStatus==='idle' && showMapa){
      dispatch(getAllMarks())
    }
  
  useEffect(()=>{
    const center = distrito ? distrito : municipio;
    if (center && center.coordinates) {
      setlocationCenter(center);}
      const moveMapToCoordinates = () => {
    if (mapRef.current) {
      const map = mapRef.current; // Substitua com as novas coordenadas desejadas

      map.setView(locationCenter.coordinates, locationCenter.zoom); // Substitua 'zoom' pelo nível de zoom desejado
    }
  };

  moveMapToCoordinates();
  },[changeMunicipio])
  useEffect(() => {
    
    fetch('./data/LuandaMarkers.geojson')
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data.features);
    
      })
      .catch(error => {
        console.log('Error fetching GeoJSON:', error);
      });
    
  }, [])
    
    return(
        <>
         
            <div className={(municipio && showMapa) && 'fixed top-5 md:top-20 grid justify-center w-full left-0 md:m-4 z-10 bg-gray-200 md:bg-transparent p-2 rounded-sm'}>
           {(!admin && showMapa && municipio)&& (
           <button className='top-0 right-0 text-right flex justify-end' onClick={()=>handleCloseMapa()}>
             <CloseIcon />
            </button>              
            )}
            {showMapa && (
            
            <label className='font-bold text-center md:text-lg block '>
            <select onChange={changeMunicipio} className='p-3 rounded-md text-center'>
                <option disabled selected value> -- Selecione o Município -- </option>

                {municipiosData.map((feature)=>{
                return (
                    <option   
                    key={feature[1][0]+feature[1][0]} 
                    value={JSON.stringify({ name: feature[0], coordinates: feature[1] })}>
                        {feature[0]}
                    </option>
                    )
                })}
            </select>
            </label>
            
            )}
            
            {(geojsonData && municipio && showMapa) && (
            <label className='font-bold text-center md:text-lg block '>
            
            <select 
                className='p-3 rounded-md text-center m-4 bg-slate-200 text-blue-600' 
                value={distrito ? (JSON.stringify({ name: distrito.name, coordinates: distrito.coordinates})):'main'} 
                onChange={changeDistrito}>
                
                <option 
                disabled 
                selected 
                value='main'>  Selecione o Distrito  </option>
                {geojsonData.filter(( feature ) => feature.properties.county === municipio.name ).map((feature,key)=>{
           
                return (
                    <>
                    <option 
                    key={feature.id} 
                    value={JSON.stringify({ name: feature.properties.name, coordinates: feature.geometry.coordinates})}>
                    {feature.properties.name}
                    </option>
                    </>
                    )
                })}
            </select>
            <p className='text-white bg-zinc-900 rounded-sm md:text-lg font-semibold m-2 text-center p-2'>Selecione um ponto de encontro</p>
            </label>
            )
            }
        
            </div>
            {(showMapa && municipio) && 
            (
            <div className='w-screen h-screen absolute'>
            <MapContainer 
                ref={mapRef} 
                center={locationCenter.coordinates} 
                zoom={locationCenter.zoom} 
                doubleClickZoom={!admin} 
                style={{height:'60vh', width:'100vw'}}
                className='fixed bottom-0 left-0 rounded-t-[25%] border-blue-500 border-solid border-2 z-10'
                >
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            {myCoordinates && (
                <Marker position={[myCoordinates.latitude,myCoordinates.longitude] } icon={customIcon}/>
                )}
                {
                  admin && (<UpMarker />)
                }

            {dataMarks?.marksData.map((feature)=>(
                <Marker 
                key={feature._id}
                position={feature.coordinates}
                icon={new Icon({iconUrl: markerIconPng,popupAnchor: [1, -34], iconSize: [25, 40],shadowUrl: iconShadow, iconAnchor: [12, 41]})}
                eventHandlers={{ dblclick: () => handleMarkerClick(feature.name,feature.coordinates,feature._id)}}
                >
                <Popup >
                    {feature.name}
                </Popup>
                </Marker> )
                )}

            </MapContainer>
            </div>
            )}
        </>
    )
}