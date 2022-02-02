import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import { doc, deleteDoc, updateDoc } from '@firebase/firestore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from '../firebaseConfig';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const icon = {
  awake:
    'https://cdn3.iconfinder.com/data/icons/family-member-flat-happy-family-day/512/Son-256.png',
  asleep:
    'https://cdn0.iconfinder.com/data/icons/family-babies-kids/24/kid-infant-baby-child-children-family-512.png',
};

const babyListViewCard = {
  display: 'flex',
  margin: '5px',
  borderRadius: '10px',
  padding: '1px',
  boxShadow: '2px 5px #B5B5B5',
};

const babyCard = {
  margin: '5px',
  padding: '1px',
  borderRadius: '10px',
  boxShadow: '1px 2px #B5B5B5',
};

const nextFeedBtn = {
  margin: '15px',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
};

export default function BabyCard({
  babyID,
  babyName,
  sleepStatus,
  nextFeed,
  viewType,
  retrieveSleepData,
  user,
  babyData,
}) {
  const babyRef = doc(db, 'users', user.uid, 'babies', babyID);

  //dont really need babyData here for now, may need or delete later
  // console.log(user.uid)

  const handleUpdateSleep = async (e, value) => {
    e.preventDefault();
    try {
      await updateDoc(babyRef, { isAsleep: value });
    } catch (err) {
      console.log(err);
    } finally {
      retrieveSleepData();
    }
  };

  const handleDeleteBaby = async () => {
    try {
      await deleteDoc(babyRef);
    } catch (err) {
      console.log(err);
    } finally {
      retrieveSleepData();
    }
  };

  return (
    <React.Fragment>
      <div style={viewType === 'list' ? babyListViewCard : null}>
        <Card className='animatedCard' style={babyCard} sx={{ maxWidth: 120, maxHeight: 140 }}>
          <FormControlLabel
            labelPlacement='top'
            label=''
            control={
              <MaterialUISwitch
                checked={sleepStatus}
                onChange={handleUpdateSleep}
                sx={{ m: 1 }}
              />
            }
          />
          <CardMedia
            style={{ height: '50px', width: '50px', margin: 'auto' }}
            component='img'
            height=''
            image={sleepStatus ? icon.asleep : icon.awake}
            alt='babyIcon'
          />
          <CardContent style={{ textAlign: 'center' }}>
            <Link href={`/baby/${babyID}`} key={babyID}>
              <a>{babyName}</a>
            </Link>
          </CardContent>
        </Card>
        {viewType === 'list' ? (
          <div className='flip-card'>
            <div className='flip-card-inner'>
              <div className='flip-card-front'>
                <div style={{ alignSelf: 'center', height: '110px', margin: '10px' }}>
                  <div style={{ margin: '20px' }}>
                    <Button style={{ color: 'black' }} variant='contained'>
                      Next Feed{' '}
                    </Button>
                  </div>
                  <div>
                    <Button style={nextFeedBtn}>
                      {' '}
                      {nextFeed === null ? 'N/A' : nextFeed}{' '}
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flip-card-back'>
                <Button
                  onClick={handleDeleteBaby}
                  style={{ marginTop: '50px' }}
                  variant='outlined'
                  startIcon={<DeleteIcon />}
                >
                  {' '}
                  Delete{' '}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}
