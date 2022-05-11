import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Select, MenuItem, TextField, Slider } from '@mui/material';
import { auth, db } from '../firebaseConfig.js';
import { useRouter } from 'next/router';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function AddBaby() {
  const [weight, setWeight] = useState(0);
  const [weightType, setWeightType] = useState('lb');
  const [date, setDate] = useState(null);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const babiesRef = collection(db, 'users', user.uid, 'babies');
      await addDoc(babiesRef, {
        name: e.target.name.value,
        birthday: date,
        weightType: weightType,
        weight: weight,
        createdAt: new Date().toISOString(),
        isAsleep: false,
        nextFeed: null,
        nextNap: null,
        babyFoodsArray: ['Milk', 'Formula', 'Corn'],
      });
      router.push('/overview');
    } catch (err) {
      console.error('Error adding baby document: ', err);
    }
  };

  return (
    <>
      <Head>
        <title>BabyManager | Add A Baby</title>
      </Head>
      <main className="mt-[calc(var(--header-height)+2rem)] content-start font-['Rubik'] h-full mx-auto w-3/4 flex flex-col justify-start px-4">
        <h1 className='font-medium self-center text-[26px] md:text-4xl lg:text-5xl'>
          Add A Baby
        </h1>
        <ChildCareIcon className='mt-4 text-[75px] self-center sm:text-[95px] lg:text-[110px] xl:text-9xl' />
        <form
          sx={{ m: 1, minWidth: 80 }}
          className='flex flex-col'
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <TextField
            className='!py-4 !pb-10'
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

          <div className='flex flex-row justify-center my-16'>
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
              className='text-stone-900 bg-emerald-50  hover:bg-cyan-200'
              variant='contained'
              type='submit'
              startIcon={<AddCircleIcon />}
            >
              Submit
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
