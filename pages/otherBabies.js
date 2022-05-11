import React, { Fragment, useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { collection, getDocs } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import loadable from '@loadable/component';

const BabyCard = loadable(() => import('../components/BabyCard'));

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

export default function OtherBabies() {
  const [view, setView] = useState('module');
  const [isViewChange, setViewChange] = useState(babyCardInModule);
  const [babyData, setBabyData] = useState(null);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      retrieveOtherSleepData();
    }
  }, [user, loading, router]);

  const getAuthorizers = async () => {
    const q = collection(db, 'users', user.uid, 'authorizers');
    const querySnapshot = await getDocs(q);
    let authorizersData = [];
    querySnapshot.forEach(doc => {
      authorizersData.push(doc.data());
    });
    return authorizersData;
  };

  const retrieveOtherSleepData = async () => {
    try {
      let authorizers = await getAuthorizers();
      var allAuthorizersBabies = [];
      authorizers.forEach(async user => {
        const q = collection(db, 'users', user.inviter_id, 'babies');
        const babiesSnapshot = await getDocs(q);
        babiesSnapshot.forEach(baby => {
          allAuthorizersBabies.push({
            id: baby.id,
            data: baby.data(),
            uid: user.inviter_id,
          });
        });
        setBabyData(allAuthorizersBabies);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrientationChange = (_, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  return (
    <Fragment>
      <div className='mt-[calc(var(--header-height)+4rem)]'>
        {babyData ? (
          <div>
            <div
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
            <div style={isViewChange}>
              {babyData.map(baby => (
                <BabyCard
                  key={baby.id}
                  babyID={baby.id}
                  babyName={baby.data.name}
                  sleepStatus={baby.data.isAsleep}
                  nextFeed={baby.data.nextFeed}
                  viewType={view}
                  retrieveSleepData={retrieveOtherSleepData}
                  user={baby}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center'>You are not invited to manage any babies</div>
        )}
      </div>
    </Fragment>
  );
}
