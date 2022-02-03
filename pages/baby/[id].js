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
  const [nextSleep, setNextSleep] = React.useState('Nothing Scheduled');
  const [nextFeed, setNextFeed] = React.useState('Nothing Scheduled');
  const [currentBaby, setCurrentBaby] = React.useState(null);
  const [babyName, setBabyName] = React.useState(null);
  const [sleepingEvents, setSleepingEvents] = React.useState(null);
  const [feedingEvents, setFeedingEvents] = React.useState(null);
  const [isAsleep, setIsAsleep] = React.useState('Asleep');
  const [foodArray, setFoodArray] = React.useState(['Loading', 'One Sec']);
  const { asPath } = useRouter();
  const path = asPath.split('/baby/')[1];

  const babySleep = () => {
    if (currentBaby.isAsleep) {
      setIsAsleep('Asleep');
    } else {
      setIsAsleep('Awake');
    }
  };

  const babyGet = async () => {
    const babyData = doc(db, 'users', user.uid, 'babies', path);
    const babySnap = await getDoc(babyData);
    setCurrentBaby(babySnap.data());
  };

  const babySleepingEvents = async () => {
    if (currentBaby === null) return;
    const babyData = collection(db, 'users', user.uid, 'babies', path, 'sleepingEvents');
    const babyQuery = query(babyData, orderBy('startTime', 'desc'), limit(10));
    const sleeps = await getDocs(babyQuery);
    const sortedSleeps = sleeps.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    for (var i = 0; i < sortedSleeps.length; i++) {
      if (sortedSleeps[i].startTime.seconds < currentBaby.nextNap.seconds) {
        setSleepingEvents(sortedSleeps[i].startTime.seconds);
        return;
      } else {
        continue;
      }
    }
  };

  const babyFeedingEvents = async () => {
    if (currentBaby === null) return;
    const babyData = collection(db, 'users', user.uid, 'babies', path, 'feedingEvents');
    const babyQuery = query(babyData, orderBy('startTime', 'desc'), limit(10));
    const feeds = await getDocs(babyQuery);
    const sortedFeeds = feeds.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    for (var i = 0; i < sortedFeeds.length; i++) {
      if (sortedFeeds[i].startTime.seconds < currentBaby.nextFeed.seconds) {
        setFeedingEvents(sortedFeeds[i].startTime.seconds);
        return;
      } else {
        continue;
      }
    }
  };

  const getLastFeedDatePretty = () => {
    if (currentBaby === null) return;
    if (feedingEvents === null) return;
    const uglyDate = new Date(feedingEvents * 1000).toString();
    const splitDate = uglyDate.split(' ');
    const uglyTime = splitDate[4].split(':');
    let prettyTime = null;
    if (uglyTime[0] > 12) {
      prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
    } else if (uglyTime[0] == 0) {
      uglyTime[0] = 12;
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    } else {
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    }
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
    setLastFeed(prettyDate);
  };

  const getNextFeedDatePretty = () => {
    if (currentBaby === null) return;
    if (currentBaby.nextFeed === null) return;
    const uglyDate = new Date(currentBaby.nextFeed.seconds * 1000).toString();
    const splitDate = uglyDate.split(' ');
    const uglyTime = splitDate[4].split(':');
    let prettyTime = null;
    if (uglyTime[0] > 12) {
      prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
    } else if (uglyTime[0] == 0) {
      uglyTime[0] = 12;
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    } else {
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    }
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
    setNextFeed(prettyDate);
  };

  const getLastNapDatePretty = () => {
    if (sleepingEvents === null) return;
    const uglyDate = new Date(sleepingEvents * 1000).toString();
    const splitDate = uglyDate.split(' ');
    const uglyTime = splitDate[4].split(':');
    let prettyTime = null;
    if (uglyTime[0] > 12) {
      prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
    } else if (uglyTime[0] == 0) {
      uglyTime[0] = 12;
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    } else {
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    }
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
    setLastSleep(prettyDate);
  };

  const getNextNapDatePretty = () => {
    if (currentBaby === null) return;
    setBabyName(currentBaby.name);
    setFoodArray(currentBaby.babyFoodsArray);
    babySleep();
    if (currentBaby.nextNap === null) return;
    const uglyDate = new Date(currentBaby.nextNap.seconds * 1000).toString();
    const splitDate = uglyDate.split(' ');
    const uglyTime = splitDate[4].split(':');
    let prettyTime = null;
    if (uglyTime[0] > 12) {
      prettyTime = `${uglyTime[0] % 12}:${uglyTime[1]} pm`;
    } else if (uglyTime[0] == 0) {
      uglyTime[0] = 12;
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    } else {
      prettyTime = `${uglyTime[0]}:${uglyTime[1]} am`;
    }
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
    setNextSleep(prettyDate);
  };

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      babyGet();
      babySleepingEvents();
      babyFeedingEvents();
    }
  }, [user]);

  useEffect(() => {
    babySleepingEvents();
    babyFeedingEvents();
    getNextNapDatePretty();
    getNextFeedDatePretty();
    getLastNapDatePretty();
    getLastFeedDatePretty();
  }, [currentBaby, sleepingEvents, feedingEvents]);

  return (
    <>
      <div style={{ paddingTop: '80px' }}></div>
      <div
        className='container mx-auto md:grid md:place-content-center'
        style={{ padding: '2rem' }}
      >
        <div className='text-center text-2xl'>
          <b>{babyName}</b>
          <div className='sb-buffer'></div>
          <hr />
          <div className='sb-buffer'></div>
        </div>
        <div className='md:sb-container md:grid-cols-1'>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center'>
            <div className='place-self-center'>
              <div className='bg-[url("/baby3.svg")] w-[125px] h-[125px] bg-center bg-cover bg-no-repeat'></div>
            </div>
            <div>
              <div className='sb-buffer'></div>
              <b>The baby is {isAsleep}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Last Feed</b>
            </div>
            <div>
              <b>{lastFeed}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Next Feed</b>
            </div>
            <div>
              <b>{nextFeed}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Last Nap</b>
            </div>
            <div>
              <b>{lastSleep}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-2 text-center sb-buffer'>
            <div>
              <b>Next Nap</b>
            </div>
            <div>
              <b>{nextSleep}</b>
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
            <div className='sb-buffer'>
              <FoodModal
                babyPath={path}
                babyGet={babyGet}
                foodArray={foodArray}
                setFoodArray={setFoodArray}
              />
            </div>
          </div>
          <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
            <div className='sb-buffer'>
              <NapModal babyPath={path} babyGet={babyGet} babyName={babyName} />
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
