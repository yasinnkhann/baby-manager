import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import loadable from '@loadable/component';

const MyComponent = loadable(() => import('../components/ChangingRoom/GoogleMap.js'));

export default function ChangingRooms() {
  const [currentLocation, setCurrentLoc] = useState({ lat: 47.5423222, lng: -122.2329451 });

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

  return (
    <div style={{ marginTop: '70px' }}>
      <Head>
        <title>Baby Manager | Changing Room Locator</title>
      </Head>
      <MyComponent center={currentLocation} />
    </div>
  );
}
