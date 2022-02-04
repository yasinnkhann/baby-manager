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

export default function Overview() {
  const [view, setView] = useState('module');
  const [isViewChange, setViewChange] = useState(babyCardInModule);
  const [babyData, setBabyData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { query } = useRouter();
  let inviteToken = query.token;

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      retrieveSleepData();
    }
    if (user && inviteToken) {
      const getInvitationDoc = async () => {
        const q = qr(collection(db, 'invitations'), where('token', '==', inviteToken));

        const querySnapshot = await getDocs(q);
        let invitationDoc = null;
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          invitationDoc = doc.data();
        });
        return invitationDoc;
      };

      const authorizeUser = async inviterId => {
        const docRef = doc(db, 'users', inviterId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      };

      const updateInvitation = async () => {
        const q = qr(collection(db, 'invitations'), where('token', '==', inviteToken));

        const querySnapshot = await getDocs(q);
        let invitationId = null;
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
          invitationId = doc.id;
        });
        return invitationId;
      };

      getInvitationDoc().then(result => {
        console.log('getInvitationDoc result:', result);
        const inviterId = result.inviter_id;
        console.log('inviterId:', inviterId);
        if (!result.accepted) {
          authorizeUser(inviterId)
            .then(async result => {
              console.log('authorizeUser result:', result);
              const docRef = await addDoc(
                collection(db, 'users', inviterId, 'authorized_users'),
                {
                  userId: user.uid,
                }
              );
              console.log("added new user to inviter's authorized collection");
            })
            .then(() => {
              updateInvitation().then(async result => {
                console.log('result:', result);
                const updateRef = doc(db, 'invitations', result);
                await updateDoc(updateRef, {
                  accepted: true,
                });
                inviteToken = null;
              });
            });
        } else {
          console.log('Invalid invitation token. Invite link is already used');
        }
      });
      // Add current user to the token's owner's authorized user's list
      // Search the invitations collection for the owner's id of the inviteToken
      // Then using that owner's id, find the owner's document in the user's collection
      // and update/insert the current user.uid into the authorized user's subcollection
      // or array?
      // First check it invitation document's accepted field is true or false
      // If true, "Invitation link is invalid"
      // If false
      // Add new user to inviter's authorized users subcollection/array
      // Set the invitation document's accepted field to "true"
    }
  }, [user, loading, router]);

  const retrieveSleepData = async () => {
    try {
      const babyRef = collection(db, 'users', user.uid, 'babies');
      const babySnap = await getDocs(babyRef);
      const babyData = [];
      babySnap.forEach(baby => babyData.push({ id: baby.id, data: baby.data() }));
      babyData.sort((a, b) => (a.data.createdAt > b.data.createdAt ? -1 : 1));
      setBabyData(babyData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrientationChange = (event, nextView) => {
    nextView === 'module' ? setViewChange(babyCardInModule) : setViewChange(babyCardInList);
    setView(nextView);
  };

  const mappedBabyCard = babyData?.map(baby => (
    <BabyCard
      key={baby.id}
      babyID={baby.id}
      babyName={baby.data.name}
      sleepStatus={baby.data.isAsleep}
      nextFeed={baby.data.nextFeed}
      viewType={view}
      retrieveSleepData={retrieveSleepData}
      user={user}
    />
  ));

  return (
    <React.Fragment>
      <div>
        {babyData.length === 0 ? (
          <div style={addBabyBtnPosition}>
            <Link href='/addBaby' passHref>
              <Button style={babyBtnStyle}>Add Baby</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div
              className='mt-[21%] sm:mt-[10%]'
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
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
