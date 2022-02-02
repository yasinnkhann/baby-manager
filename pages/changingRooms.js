import React, { useState, useEffect } from 'react';
import { MyMapComponent } from '../components/ChangingRoom/GoogleMap.js';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import MyComponents from '../components/ChangingRoom/GoogleMap.js';

export default function ChangingRooms(props) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
  const [currentLocation, setCurrentLoc] = useState({ lat: 47.5, lng: -112.644 });
  const [bathrooms, setBathrooms] = useState({});

  const clickHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(pos);
          setCurrentLoc(pos);
        },
        () => {
          console.log('user denied permission');
        }
      );
    }
  };
  return (
    <div style={{ marginTop: '100px' }}>
      {/* <form>
        <input type='text' placeholder='search'></input>
        <input type='submit'></input>
      </form> */}
      <MyLocationIcon onClick={clickHandler} />
      <button onClick={clickHandler}>Current Location</button>
      {/* <MyMapComponent isMarkerShown location={currentLocation} /> */}
      <MyComponents center={currentLocation} zoom={10} />
    </div>
  );
}
