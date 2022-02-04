import React, { useEffect, useState } from 'react';
import BabyCard from '../components/BabyCard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query as qr,
  getDoc,
  where,
  updateDoc,
} from '@firebase/firestore';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { auth, db } from '../firebaseConfig';

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

const addBabyBtnPosition = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '300px',
};

const babyBtnStyle = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
};

export default function OtherBabies() {
  const [view, setView] = useState('module');
  const [isViewChange, setViewChange] = useState(babyCardInModule);
  const [authorizersBabyData, setAuthorizersBabyData] = useState(null);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  // var allAuthorizersBabies = [];

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
      console.log(doc.id, ' => ', doc.data());
      authorizersData.push(doc.data());
    });
    return authorizersData;
  };

  const retrieveOtherSleepData = async () => {
    try {
      let authorizers = await getAuthorizers();
      var allAuthorizersBabies = [];
      authorizers.forEach(async user => {
        // console.log('user inviter id', user.inviter_id);
        const q = collection(db, 'users', user.inviter_id, 'babies');
        const babiesSnapshot = await getDocs(q);
        // let allAuthorizersBabies = [];
        babiesSnapshot.forEach(baby => {
          console.log(baby.id, ' => ', baby.data());
          allAuthorizersBabies.push({
            id: baby.id,
            data: baby.data(),
            uid: user.inviter_id,
          });
        });
        setAuthorizersBabyData(allAuthorizersBabies);
      });
      // console.log('typeof allAuthorizersBabies:', typeof allAuthorizersBabies);
      // console.log('allAuthorizersBabies[1]:', allAuthorizersBabies[1]);
      console.log('allAuthorizersBabies:', allAuthorizersBabies);
      // await setAuthorizersBabyData(allAuthorizersBabies);
      console.log('authorizersBabyData after setting state:', authorizersBabyData);
    } catch (err) {
      console.log(err);
    }
  };

  //   getAuthorizers()
  //     .then(users => {
  //       console.log('getAuthorizers result:', users);
  //       users.forEach(async user => {
  //         // console.log('user inviter id', user.inviter_id);
  //         const q = collection(db, 'users', user.inviter_id, 'babies');
  //         console.log('q:', q);
  //         const babiesSnapshot = await getDocs(q);
  //         // let allAuthorizersBabies = [];
  //         babiesSnapshot.forEach(baby => {
  //           console.log(baby.id, ' => ', baby.data());
  //           allAuthorizersBabies.push({
  //             id: baby.id,
  //             data: baby.data(),
  //             uid: user.inviter_id,
  //           });
  //         });
  //       });
  //     })
  //     .then(() => {
  //       console.log('typeof allAuthorizersBabies:', typeof allAuthorizersBabies);
  //       console.log('allAuthorizersBabies[1]:', allAuthorizersBabies[1]);
  //       console.log('allAuthorizersBabies:', allAuthorizersBabies);
  //       setAuthorizersBabyData(allAuthorizersBabies);
  //     })
  //     .then(() =>
  //       console.log('authorizersBabyData after setting state:', authorizersBabyData)
  //     );
  // } catch (err) {
  //   console.log(err);
  // }
  // };

  const handleOrientationChange = (event, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  // const baby = {
  //   data: [
  //     {
  //       id: 1,
  //       babyName: 'Ryne',
  //       sleep: true,
  //       nextFeedTime: '12:30pm',
  //     },
  //     {
  //       id: 2,
  //       babyName: 'Alissa',
  //       sleep: false,
  //       nextFeedTime: '13:30pm',
  //     },
  //     {
  //       id: 3,
  //       babyName: 'Jake',
  //       sleep: true,
  //       nextFeedTime: '16:34pm',
  //     },
  //     {
  //       id: 4,
  //       babyName: 'Hatha',
  //       sleep: false,
  //       nextFeedTime: '13:30pm',
  //     },
  //     {
  //       id: 5,
  //       babyName: 'Ryan',
  //       sleep: true,
  //       nextFeedTime: '15:30pm',
  //     },
  //     {
  //       id: 6,
  //       babyName: 'Yasin',
  //       sleep: true,
  //       nextFeedTime: '10:30pm',
  //     },
  //     {
  //       id: 7,
  //       babyName: 'Edward',
  //       sleep: false,
  //       nextFeedTime: '11:30pm',
  //     },
  //     {
  //       id: 8,
  //       babyName: 'Daniel',
  //       sleep: true,
  //       nextFeedTime: '13:30pm',
  //     },
  //     {
  //       id: 9,
  //       babyName: 'Derek',
  //       sleep: false,
  //       nextFeedTime: '13:30pm',
  //     },
  //   ],
  // };

  return (
    <React.Fragment>
      <div>
        {authorizersBabyData ? (
          <div>
            <div
              className='mt-[21%]'
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
              {authorizersBabyData.map(baby => (
                <BabyCard
                  key={baby.id}
                  babyID={baby.id}
                  babyName={baby.name}
                  sleepStatus={baby.sleep}
                  nextFeed={baby.nextFeedTime}
                  retrieveOtherSleepData={retrieveOtherSleepData}
                  user={baby}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='my-[20%] text-center'>You are not invited to manage any babies</div>
        )}
      </div>
    </React.Fragment>
  );
}
