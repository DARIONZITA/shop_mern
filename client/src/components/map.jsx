import React, { useEffect, useState,useRef } from 'react';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {setMunicipioAndDistrito, deleteDistrito} from "../features/customer/cart/cartSlice.js"

import { useDispatch, useSelector } from "react-redux";

function Map() {
  
  // Defina o ícone personalizado
  const customIcon = new Icon({
    iconUrl: '../src/assets/gps (3).png',
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

 
  const {municipio,municipiosData,distrito } = useSelector((store) => store.cart);
  const [locationCenter,setlocationCenter]=useState(patternCenter)
  const [geojsonData, setGeojsonData] = useState(null);  
  const [geoMarker, setGeoMarker]= useState()
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [myCoordinates, setMyCoordinates] = useState(null);
  const [distance, setDistance]=useState()

  const handleMarkerClick = (placeName, coordinates) => {
    setSelectedPlace([placeName,coordinates]);
  };
  const getMycoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
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


  useEffect(()=>{
    if(geoMarker && myCoordinates){  
      
      setDistance(geoMarker.map((feature,key)=>{
        return ((feature.geometry.coordinates[0]-myCoordinates.latitude)**2+(feature.geometry.coordinates[1]-myCoordinates.longitude)**2)**1/2
      }))
      }
  },[myCoordinates])
  useEffect(()=>{
    if(distance){
   
      const minDistance=distance.reduce((a,b)=>Math.min(a,b))
      const minPosition=distance.indexOf(minDistance)
      setSelectedPlace([geoMarker[minPosition].properties.name,geoMarker[minPosition].geometry.coordinates])
    }
    
  },[distance])
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
    
    fetch('../LuandaMarkers.geojson')
      .then(response => response.json())
      .then(data => {
        setGeojsonData(data.features);
        setGeoMarker(data.features.filter((feature)=>feature.properties.place!=='Distrito'))
      })
      .catch(error => {
        console.log('Error fetching GeoJSON:', error);
      });
    
  }, [])


  return (
    <>
    <MapContainer 
        ref={mapRef} 
        center={locationCenter.coordinates} 
        zoom={locationCenter.zoom} 
        style={{height:'50vh', width:'50vw'}}>

      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      {myCoordinates && (
        <Marker position={[myCoordinates.latitude,myCoordinates.longitude] } icon={customIcon}/>
        )}

      {geoMarker?.map((feature)=>(
        <Marker 
          key={feature.id}
          position={feature.geometry.coordinates}
          eventHandlers={{ click: () => handleMarkerClick(feature.properties.name,feature.geometry.coordinates)}}
          >
          <Popup>
            {feature.properties.name}
          </Popup>
        </Marker> )
        )}

    </MapContainer>

    <label>Selecione uma opção:</label>

      <select onChange={changeMunicipio}>
        <option disabled selected value> -- select an option -- </option>

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

   {(geojsonData && municipio) && (
    <>
    <label>Selecione uma opção Distrito:</label>
      <select value={distrito ? (JSON.stringify({ name: distrito.name, coordinates: distrito.coordinates})):'main'} onChange={changeDistrito}>
      
        <option disabled selected value='main'> -- select an option -- </option>
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
      </>
      )
      }
    <p>Name: {locationCenter.name}</p>
    <p>Name: {distrito?.name}</p>
    <div>
      <button className='p-4 bg-blue-400 text-xl ' onClick={getMycoordinates}>Ponto de encontro automático </button>
      {myCoordinates && (
        <p>
          Latitude: {myCoordinates.latitude}, Longitude: {myCoordinates.longitude}
        </p>
      )}
    </div>
    <p>selecionou o {selectedPlace? selectedPlace[0] : 'Selecione um ponto de encontro'}</p>
    </>

  );
}

export default Map;