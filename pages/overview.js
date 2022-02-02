import React, { useEffect, useState } from 'react';
import BabyCard from '../components/BabyCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

//authentication
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { useRouter } from 'next/router';

//connect to firestore database
import { collection, addDoc, getDocs, doc } from '@firebase/firestore';

import Link from 'next/link';
// import axios from 'axios';

// const baby = {
//   data: [{
//     id: 1,
//     babyName: "Ryne",
//     sleep: true,
//     nextFeedTime: '12:30pm'
//     },
//     {
//     id: 2,
//     babyName: "Alissa",
//     sleep: false,
//     nextFeedTime: '13:30pm'
//     },
//     {
//     id: 3,
//     babyName: "Jake",
//     sleep: true,
//     nextFeedTime: '16:34pm'
//     },
//     {
//     id: 4,
//     babyName: "Hatha",
//     sleep: false,
//     nextFeedTime: '13:30pm'
//     },
//     {
//     id: 5,
//     babyName: "Ryan",
//     sleep: true,
//     nextFeedTime: '15:30pm'
//     },
//     {
//     id: 6,
//     babyName: "Yasin",
//     sleep: true,
//     nextFeedTime: '10:30pm'
//     },
//     {
//     id: 7,
//     babyName: "Edward",
//     sleep: false,
//     nextFeedTime: '11:30pm'
//     },
//     {
//     id: 8,
//     babyName: "Daniel",
//     sleep: true,
//     nextFeedTime: '13:30pm'
//     },
//     {
//     id: 9,
//     babyName: "Derek",
//     sleep: false,
//     nextFeedTime: '13:30pm'
//     },
//   ],
// };

const babyCardInModule = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1px',
  marginBottom: '80px',
};

const babyCardInList = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1px',
  marginBottom: '90px',
};

export default function Overview() {
  const [view, setView] = useState('module');
  const [isViewChange, setViewChange] = useState(babyCardInModule);
  const [babyData, setBabyData] = useState([]);

  //authentication
  const [user, loading, router] = useAuthState(auth);
  // const router = useRouter();

  //authentication
  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      retrieveSleepData();
    }
  }, [user, loading, router]);

  const retrieveSleepData = async () => {
    try {
      const babyRef = collection(db, 'users', user.uid, 'babies');
      const babySnap = await getDocs(babyRef);
      const babyData = [];
      babySnap.forEach(baby => babyData.push({ id: baby.id, data: baby.data() }));
      // notesData.sort((a, b) => (a.data.createdAt > b.data.createdAt ? -1 : 1));
      console.log('Print from ', babyData);
      setBabyData(babyData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrientationChange = (event, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  const mappedBabyCard = babyData.map(data => (
    <BabyCard
      key={data.id}
      babyID={data.id}
      babyName={data.data.name}
      // sleepStatus={data.sleep}
      // nextFeedTime={data.nextFeedTime}
      viewType={view}
    />
  ));

  return (
    <React.Fragment>
      <div
        className=' mt-[21%]'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ToggleButtonGroup
          orientation='horizontal'
          value={view}
          exclusive
          onChange={handleOrientationChange}
        >
          <ToggleButton value='module' aria-label='module'>
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value='list' aria-label='list'>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div style={isViewChange}>{mappedBabyCard}</div>
    </React.Fragment>
  );
}
