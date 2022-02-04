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
  const [curAsleep, setCurAsleep] = React.useState(false);
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
    const babyData = doc(db, 'users', baby.uid ? baby.uid : user.uid, 'babies', path);
    const babySnap = await getDoc(babyData);
    setCurrentBaby(babySnap.data());
  };

  const babySleepingEvents = async () => {
    if (currentBaby === null) return;
    const babyData = collection(
      db,
      'users',
      baby.uid ? baby.uid : user.uid,
      'babies',
      path,
      'sleepingEvents'
    );
    const babyQuery = query(babyData, orderBy('startTime', 'desc'), limit(10));
    const sleeps = await getDocs(babyQuery);
    const sortedSleeps = sleeps.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (sortedSleeps.length < 1) return;
    for (var i = 0; i < sortedSleeps.length; i++) {
      if (
        sortedSleeps[i].startTime.seconds <= currentBaby.nextNap.seconds &&
        sortedSleeps[i].startTime.seconds * 1000 < Date.now()
      ) {
        setSleepingEvents(sortedSleeps[i].startTime.seconds);
        return;
      } else {
        continue;
      }
    }
  };

  const babyFeedingEvents = async () => {
    if (currentBaby === null) return;
    const babyData = collection(
      db,
      'users',
      baby.uid ? baby.uid : user.uid,
      'babies',
      path,
      'feedingEvents'
    );
    const babyQuery = query(babyData, orderBy('startTime', 'desc'), limit(10));
    const feeds = await getDocs(babyQuery);
    const sortedFeeds = feeds.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (sortedFeeds.length < 1) return;
    for (var i = 0; i < sortedFeeds.length; i++) {
      if (
        sortedFeeds[i].startTime.seconds <= currentBaby.nextFeed.seconds &&
        sortedFeeds[i].startTime.seconds * 1000 < Date.now()
      ) {
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
    setBabyName(currentBaby.name);
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
    //check to see if date makes sense
    if (currentBaby.nextFeed.seconds * 1000 > Date.now()) {
      const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
      setNextFeed(prettyDate);
    } else {
      setNextFeed('Nothing Scheduled');
    }
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
    setCurAsleep(currentBaby.isAsleep);
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
    //check to see if date even makes sense
    if (currentBaby.nextNap.seconds * 1000 > Date.now()) {
      const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}, ${prettyTime}`;
      setNextSleep(prettyDate);
    } else {
      setNextSleep('Nothing Scheduled');
    }
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
        style={{ padding: '1rem' }}
      >
        <div className='text-center text-2xl'>
          <p style={{ color: '#f5f5f5' }} className='text-5xl font-medium'>
            {babyName}
          </p>
          <div className='sb-buffer'></div>
          <hr
            style={{ border: '3px solid #f5f5f5', borderRadius: '3px', background: 'white' }}
          ></hr>
          <div className='sb-buffer'></div>
        </div>
        <div className='md:sb-container md:grid-cols-1'>
          <div style={{ maxWidth: '550px' }} className='mx-auto'>
            <div
              style={{
                width: '250px',
                height: '250px',
                display: 'flex',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: 'white',
                boxShadow: '1px 1px 11px 6px lightblue',
              }}
              className='rounded-full p-2 mx-auto flex-col'
            >
              <div className='sb-buffer'></div>
              {curAsleep ? (
                <div className='bg-[url("/asleep-baby-white.svg")] w-[125px] h-[125px] bg-center bg-cover bg-no-repeat mx-auto'></div>
              ) : (
                <div className='bg-[url("/awake-baby-white.svg")] w-[125px] h-[125px] bg-center bg-cover bg-no-repeat mx-auto'></div>
              )}
              <p className='font-medium text-center'>Your baby is {isAsleep}!</p>
            </div>
            <div className='sb-buffer'></div>
            <div className='w-full h-[75px] bg-[#f5f5f5] rounded-md p-2'>
              <p className='text-xl font-medium'>Next Nap</p>
              <p className='indent-5'>{nextSleep}</p>
            </div>
            <div className='sb-buffer'></div>
            <div className='w-full h-[75px] bg-[#f5f5f5] rounded-md p-2'>
              <p className='text-xl font-medium'>Last Nap</p>
              <p className='indent-5'>{lastSleep}</p>
            </div>
            <div className='sb-buffer'></div>
            <div className='w-full h-[75px] bg-[#f5f5f5] rounded-md p-2'>
              <p className='text-xl font-medium'>Next Feed</p>
              <p className='indent-5'>{nextFeed}</p>
            </div>
            <div className='sb-buffer'></div>

            <div className='w-full h-[75px] bg-[#f5f5f5] rounded-md p-2'>
              <p className='text-xl font-medium'>Last Feed</p>
              <p className='indent-5'>{lastFeed}</p>
            </div>
          </div>
          <div className='sb-buffer'></div>
          <div style={{ display: 'grid' }} className='grid-cols-1 text-center'>
            <div className='sb-buffer'>
              <FoodModal
                babyPath={path}
                babyGet={babyGet}
                foodArray={foodArray}
                setFoodArray={setFoodArray}
                babyName={babyName}
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
