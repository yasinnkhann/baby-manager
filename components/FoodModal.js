import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import { auth, db } from '../firebaseConfig.js';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
  orderBy,
  limit,
  addDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import router, { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

//work on styling for this, cuts off a little bit at the top when overflow is to big
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

const FoodModal = ({ babyPath }) => {
  const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [food, setFood] = React.useState(['Formula', 'Milk', 'Mushy Peas']);
  const [foodValue, setFoodValue] = React.useState('');
  const [foodAmount, setFoodAmount] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [feedTime, setFeedTime] = React.useState(new Date());
  const [feedDate, setFeedDate] = React.useState(new Date().toString());

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
  //----Scrape Data and prepare for post------//
  //------------------------------------------//
  const postNextFood = () => {
    updateDoc(doc(db, 'users', user.uid, 'babies', babyPath), {
      nextFeed: feedTime,
    }).then(res => {
      addDoc(collection(db, 'users', user.uid, 'babies', babyPath, 'feedingEvents'), {
        foodAmount: foodAmount,
        foodMetric: 'oz',
        foodType: foodValue,
        startTime: feedTime,
      }).then(res2 => {
        console.log('res2', res2);
      });
      console.log('res', res);
    });
    toClose();
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
  // useEffect(() => {
  //   console.log('Type of Food', foodValue);
  //   console.log('How much Food', foodAmount);
  //   console.log('Time', feedTime);
  //   console.log('Date', feedDate);
  // }, [foodValue, foodAmount, feedTime, feedDate]);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    } else if (user) {
      // console.log('that');
    }
    // getLastFeedDatePretty();
    // getLastNapDatePretty();
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
        style={{ width: '300px', backgroundColor: 'lightgreen' }}
        className='rounded-md border-2 border-emerald-400'
        variant='contained'
      >
        Add New Feed
      </Button>
      <Modal open={open} onClose={toClose}>
        <Box sx={popupStyle} className='sm:w-5/5 md:w-3/5'>
          <b>{date}</b>
          <hr />
          <div className='sb-buffer'></div>
          <FormControl fullWidth noValidate>
            <InputLabel id='foodLabel'>Type of Food</InputLabel>
            <Select
              onChange={e => setFoodValue(e.target.value)}
              value={foodValue}
              labelId='foodLabel'
              id='foodFed'
              label='Type of Food'
            >
              {food.map(food => {
                return (
                  <MenuItem key={food} value={food}>
                    {food}
                  </MenuItem>
                );
              })}
            </Select>
            <div className='sb-buffer'>
              <label id='amountLabel'>
                {foodAmount} oz. of {foodValue}
              </label>
            </div>
            <Slider
              className='py-8'
              valueLabelDisplay='auto'
              min={0}
              max={16}
              step={0.5}
              onChange={e => setFoodAmount(e.target.value)}
            ></Slider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Date of Feeding'
                value={feedDate}
                onChange={newValue => {
                  setFeedDate(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div style={{ width: '300px' }} className='place-self-center'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticTimePicker
                  value={feedTime}
                  onChange={time => setFeedTime(time)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div className='sb-buffer'></div>
            </div>
            <div style={{ display: 'flex' }} className='flex-col'>
              <Button
                onClick={postNextFood}
                style={{ backgroundColor: 'lightgreen', width: '50%' }}
                className='rounded-md border-2 border-emerald-400 place-self-center'
                variant='contained'
                starticon='<Icon />'
              >
                Save
              </Button>
              <div className='sb-buffer'></div>
              <Button
                style={{ backgroundColor: 'lightgreen', width: '50%' }}
                className='rounded-md border-2 border-emerald-400 place-self-center'
                variant='contained'
                onClick={toClose}
              >
                Cancel
              </Button>
            </div>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};
//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

export default FoodModal;
