import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Button from '@mui/material/Button';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { auth, db } from '../firebaseConfig.js';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

const popupStyle = {
  position: 'absolute',
  borderRadius: '15px',
  top: '50%',
  left: '50%',
  maxHeight: '100%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//--------------------------------------------------------//
//------------------Modal Window Section------------------//
//--------------------------------------------------------//

const NapModal = ({ babyPath, babyGet, babyName }) => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [napDate, setNapDate] = useState(null);
  const [reminderIcon, setReminderIcon] = useState(<NotificationsOffIcon color='disabled' />);
  const [reminderState, setReminderState] = useState(false);
  const [displayReminderTime, setDisplayReminderTime] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [smsNumber, setSmsNumber] = useState(null);

  //------------------------------------------//
  //----To handle open and close Modal--------//
  //------------------------------------------//
  const toOpen = () => {
    setOpen(true);
  };
  const toClose = () => {
    setOpen(false);
  };
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----Post Request--------------------------//
  //------------------------------------------//
  const postNextNap = async () => {
    if (napDate.getTime() < Date.now()) {
      window.alert(
        'Please Select a valid Date and Time for sleeping event ahead of current time.'
      );
      return;
    }
    let hourAhead = Date.now() + 3660000;
    let remTime = reminderTime.getTime();
    if (smsNumber !== null) {
      if (hourAhead > remTime) {
        window.alert(
          'Please Input a reminder time at least 65 minutes ahead of current time.'
        );
        return;
      }
      if (smsNumber.split('').length !== 10) {
        window.alert('Please input a valid cell phone number.');
        return;
      }
      await updateDoc(doc(db, 'users', user.uid, 'babies', babyPath), {
        nextNap: napDate,
      }).then(res => {
        addDoc(collection(db, 'users', user.uid, 'babies', babyPath, 'sleepingEvents'), {
          startTime: napDate,
        }).then(res2 => {
          // console.log('res2', res2);
          // console.log('res', res);
        });
      });
      toClose();
      babyGet();
      sendSMS();
    } else {
      await updateDoc(doc(db, 'users', user.uid, 'babies', babyPath), {
        nextNap: napDate,
      }).then(() => {
        addDoc(collection(db, 'users', user.uid, 'babies', babyPath, 'sleepingEvents'), {
          startTime: napDate,
        });
      });
      toClose();
      babyGet();
    }
  };

  const sendSMS = async () => {
    let notificationBody = {
      to: smsNumber, // this can be number or string
      body: `This is a nap reminder for ${babyName} scheduled for ${napDate.toLocaleString(
        'en-US'
      )}`,
      date: reminderTime.toISOString(),
    };

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationBody),
    });

    const data = await res.json();
    console.log(data);
    setSmsNumber(null);
  };

  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----To Get Pretty Date--------------------//
  //------------------------------------------//
  const getPrettyDate = () => {
    const uglyDate = new Date().toString();
    const splitDate = uglyDate.split(' ');
    const prettyDate = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]}, ${splitDate[3]}`;
    setDate(prettyDate);
  };
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----Use Effect to Render/Log--------------//
  //------------------------------------------//

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      // console.log('that');
    }
  }, [user]);

  useEffect(() => {
    getPrettyDate();
  }, []);
  //------------------------------------------//
  //------------------------------------------//
  //------------------------------------------//

  //------------------------------------------//
  //----Render Component----------------------//
  //------------------------------------------//
  return (
    <div>
      <Button
        onClick={toOpen}
        style={{
          width: '300px',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        }}
        className='rounded-md border-2 border-emerald-400'
        variant='contained'
        color='success'
      >
        Add New Nap
      </Button>
      <Modal open={open} onClose={toClose}>
        <Box sx={popupStyle} className='sm:w-5/5 md:w-3/5'>
          <div style={{ width: '300px' }}></div>
          <b>{date}</b>
          <hr />
          <div className='sb-buffer'></div>
          <FormControl fullWidth noValidate>
            <div style={{ display: 'flex' }} className='flex-col'>
              <div className='place-self-center'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label='Date of Nap'
                    value={napDate}
                    onChange={newValue => {
                      setNapDate(newValue);
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className='sb-buffer'></div>
              </div>
            </div>
            <div style={{ display: 'flex' }} className='flex-col'>
              <p className='text-center'>Send a Text Reminder?</p>
              <p className='text-center text-xs'>
                Reminder must be set at least 65 mins in advance.
              </p>
              <Button
                style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
                className='w-[25px] place-self-center'
                onClick={() => {
                  if (reminderState) {
                    setReminderIcon(<NotificationsOffIcon color='disabled' />);
                    setReminderState(false);
                    setDisplayReminderTime(true);
                  }
                  if (!reminderState) {
                    setReminderIcon(<NotificationsActiveIcon sx={{ color: 'gold' }} />);
                    setReminderState(true);
                    setDisplayReminderTime(false);
                  }
                }}
                variant='contained'
              >
                {reminderIcon}
              </Button>
              <div className='sb-buffer'></div>
              <div className='place-self-center' hidden={displayReminderTime}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileTimePicker
                    label='Reminder Time'
                    value={reminderTime}
                    onChange={time => {
                      setReminderTime(time);
                    }}
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <div className='sb-buffer'></div>
                <p className='text-center text-xs'>Please Input Phone Number</p>
                <p className='text-center text-xs'>10 Digits, Numbers only</p>
                <br />
                <TextField
                  id='telNumber'
                  label='Mobile Number'
                  variant='outlined'
                  onChange={e => setSmsNumber(e.target.value)}
                />
              </div>
            </div>
          </FormControl>
          <div className='sb-buffer'></div>
          <div style={{ display: 'flex' }} className='flex-col'>
            <Button
              onClick={postNextNap}
              style={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                width: '50%',
              }}
              className='rounded-md border-2 border-emerald-400 place-self-center'
              variant='contained'
            >
              Save
            </Button>
            <div className='sb-buffer'></div>
            <Button
              style={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                width: '50%',
              }}
              className='rounded-md border-2 border-emerald-400 place-self-center'
              variant='contained'
              onClick={toClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

export default NapModal;
