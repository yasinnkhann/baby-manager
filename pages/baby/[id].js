import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FoodModal from '../../components/FoodModal.js';
import { db, auth } from '../../firebaseConfig.js';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import NapModal from '../../components/NapModal.js';
import React, { useState, useEffect } from 'react';
import router, { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

//--------------------------------------------------------//
//------------------Render to Page------------------------//
//--------------------------------------------------------//
const Baby = ({ baby }) => {
  const [user, loading, error] = useAuthState(auth);
  const [lastFeed, setLastFeed] = React.useState(null);
  const [lastSleep, setLastSleep] = React.useState(null);
  const [currentBaby, setCurrentBaby] = React.useState(null);
  const { asPath } = useRouter();
  const path = asPath.split('/baby/')[1];

  const babyGet = async () => {
    const babyData = doc(db, 'users', user.uid, 'babies', path);
    const babySnap = await getDoc(babyData);
    setCurrentBaby(babySnap.data());
  };

  // const getLastFeedDatePretty = () => {
  //   const uglyDate = new Date(parsedBaby.lastFeed.startTime.seconds * 1000).toString();
  //   const splitDate = uglyDate.split(' ');
  //   const uglyTime = splitDate[4].split(':');
  //   let prettyTime = null;
  //   if (uglyTime[0] > 12) {
  //     prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
  //   } else {
  //     prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
  //   }
  //   const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
  //   setLastFeed(prettyDate || 'No Date');
  // };

  // const getLastNapDatePretty = () => {
  //   const uglyDate = new Date(parsedBaby.lastSleep.startTime.seconds * 1000).toString();
  //   const splitDate = uglyDate.split(' ');
  //   const uglyTime = splitDate[4].split(':');
  //   let prettyTime = null;
  //   if (uglyTime[0] > 12) {
  //     prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
  //   } else {
  //     prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
  //   }
  //   const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
  //   setLastSleep(prettyDate);
  // };

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      babyGet();
    }
    // getLastFeedDatePretty();
    // getLastNapDatePretty();
  }, [user]);

  return (
    <>
      <div style={{ paddingTop: '80px' }}></div>
      <div
        className='container mx-auto md:grid md:place-content-center'
        style={{ padding: '2rem' }}
      >
        <div className='md:sb-container md:grid-cols-1'>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center'>
            <div className='place-self-center'>
              <div style={{ backgroundColor: 'lightgreen', width: '150px', height: '150px' }}>
                Baby Picture
              </div>
            </div>
            <div>
              <b>{null}</b>
              <div className='sb-buffer'></div>
              <b>Awake</b>
              <button
                style={{ width: '50px' }}
                className='rounded-md border-2 border-emerald-400'
              >
                <WbSunnyIcon />
              </button>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Last Feed</b>
            </div>
            <div>
              <b>{null}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Next Feed</b>
            </div>
            <div>
              <b>{null}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Last Nap</b>
            </div>
            <div>
              <b>{null}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Next Nap</b>
            </div>
            <div>
              <b>{null}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
            <div className='sb-buffer'>
              <FoodModal babyPath={path} />
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
            <div className='sb-buffer'>
              <NapModal babyPath={path} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: '80px' }}></div>
    </>
  );
};

//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

export default Baby;
