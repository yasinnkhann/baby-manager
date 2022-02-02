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
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  //authentication
  useEffect(() => {
    if (!user) {
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
      babyData.sort((a, b) => (a.data.createdAt > b.data.createdAt ? -1 : 1));
      console.log('Print from BabyData', babyData);
      setBabyData(babyData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrientationChange = (event, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  const mappedBabyCard = babyData.map(baby => (
    <BabyCard
      key={baby.id}
      babyID={baby.id}
      babyName={baby.data.name}
      sleepStatus={baby.data.isAsleep}
      nextFeed={baby.data.nextFeed}
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
