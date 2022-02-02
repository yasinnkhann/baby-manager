import React, { useState, useEffect } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import axios from 'axios';
import Head from 'next/head';
import MyComponent from '../components/ChangingRoom/GoogleMap.js';

export default function ChangingRooms(props) {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
  const [currentLocation, setCurrentLoc] = useState({ lat: 47.5423222, lng: -122.2329451 });
  const [home, setHome] = useState(false);

  useEffect(() => {
    let isApiSubscribed = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          if (isApiSubscribed) {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLoc(pos);
          }
        },
        () => {
          console.log('user denied permission');
        }
      );
    }
    return () => {
      isApiSubscribed = false;
    };
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

  let buttonStyle = {
    padding: '7px',
    backgroundColor: 'white',
    borderRadius: '2px',
    fontFamily: 'Roboto, Arial, sans-serif',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
    zIndex: '30',
    position: 'absolute',
    top: '80px',
    right: '60px',
    height: '40px',
  };

  return (
    <div style={{ marginTop: '70px' }}>
      <Head>
        <title>Baby Manager | Changing Room Locator</title>
      </Head>
      <button style={buttonStyle} onClick={clickHandler}>
        {' '}
        <MyLocationIcon /> <div className='hidden md:inline'>Current Location</div>
      </button>
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
