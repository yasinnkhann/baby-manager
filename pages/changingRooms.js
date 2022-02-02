import React, { useState, useEffect } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import Head from 'next/head';
import Script from 'next/script';
import MyComponent from '../components/ChangingRoom/GoogleMap.js';

export default function ChangingRooms(props) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
  const [currentLocation, setCurrentLoc] = useState({ lat: 47.5423222, lng: -122.2329451 });
  const [home, setHome] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLoc(pos);
        },
        () => {
          console.log('user denied permission');
        }
      );
    }
  }, []);

  const clickHandler = () => {
    setHome(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
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
      <MyLocationIcon onClick={clickHandler} />
      <button onClick={clickHandler}>Current Location</button>
      <MyComponent
        home={home}
        setHome={setHome}
        center={currentLocation}
        zoom={10}
        location={currentLocation}
      />
    </div>
  );
}
