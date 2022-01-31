import { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  FormControl,
} from '@mui/material';

import { auth, db } from '../firebaseConfig.js';
import { useRouter } from 'next/router';
import { doc, addDoc, collection } from 'firebase/firestore';

export default function AddBaby() {
  const [weight, setWeight] = useState(0);
  const [weightType, setWeightType] = useState('lb');
  const [date, setDate] = useState(null);
  const [user] = useAuthState(auth);
  const babiesRef = collection(db, 'users', user, 'babies');

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const docRef = await addDoc(babiesRef, {
        name: e.target.name.value,
        birthday: date,
        weightType: weightType,
        weight: weight,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error adding baby document: ', err);
    }
  };

  return (
    <div className='h-screen mt-[25%]'>
      <main className="content-start font-['Rubik'] h-full mx-auto w-3/4 mt-2 flex flex-col justify-start px-4">
        <h1 className='font-medium self-center text-[26px] md:text-4xl lg:text-5xl'>
          Add A Baby
        </h1>
        <ChildCareIcon className='text-[75px] self-center sm:text-[95px] lg:text-[110px] xl:text-9xl' />
        <form
          sx={{ m: 1, minWidth: 80 }}
          className='flex flex-col'
          onSubmit={e => {
            handleSubmit(e);
            // console.log('this is the submit stuff',e.target.name.value);
            // console.log('this is the submit stuff', date);
            // console.log('this is the submit stuff', weightType);
            // console.log('this is the submit stuff', weight);
            // console.log('current usr all info', auth.currentUser);
            // console.log('current usr id', auth.currentUser.uid);
          }}
        >
          <TextField
            className='py-4 pb-10'
            id='name'
            label='Name'
            variant='standard'
            required
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              id='birthday'
              label='Birthday'
              value={date}
              onChange={newValue => {
                setDate(newValue);
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>

          <div className='flex flex-row justify-center my-2'>
            <Slider
              className='py-8 text-stone-900'
              valueLabelDisplay='auto'
              min={0}
              max={25}
              step={0.1}
              onChange={e => setWeight(e.target.value)}
            ></Slider>
            <Select
              className='ml-6'
              aria-labelledby='demo-row-radio-buttons-group-label'
              id='weight-type-select'
              value={weightType}
              label='Weight Type'
              sx={{ m: 1 }}
              onChange={e => setWeightType(e.target.value)}
            >
              <MenuItem key='lb' value='lb'>
                lb
              </MenuItem>
              <MenuItem key='kg' value='kg'>
                kg
              </MenuItem>
            </Select>
          </div>
          <div className='flex flex-row justify-center'>
            <Button
              className='min-w-[125px] max-w-[20%] text-stone-900 bg-emerald-50  hover:bg-cyan-200 mt-[4%] '
              variant='contained'
              type='submit'
              startIcon={<AddCircleIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
