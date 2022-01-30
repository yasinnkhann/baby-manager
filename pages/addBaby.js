import { useState } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function AddBaby() {
  const [weight, setWeight] = useState(0);
  const [weightType, setWeightType] = useState('');
  const [date, setDate] = useState(null);

  return (
    <div className='h-screen'>
      <main className="font-['Rubik'] h-full mx-auto w-1/2 flex flex-col justify-center px-4">
        <h1 className='font-medium self-center text-xl md:text-4xl lg:text-5xl'>Add A Baby</h1>
        <ChildCareIcon className='self-center sm:text-5xl lg:text-6xl xl:text-9xl' />
        <FormControl sx={{ m: 1, minWidth: 80 }} className='flex flex-col'>
          <TextField
            className='py-4 pb-10'
            id='name'
            label='Name'
            variant='standard'
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Birthday'
              value={date}
              onChange={newValue => {
                setDate(newValue);
              }}
              renderInput={params => <TextField {...params} />}
            />
          </LocalizationProvider>

          <div className='flex flex-row space-x-8 justify-center pt-5 '>
            <IconButton color='primary' aria-label='upload picture' component='span'>
              <FemaleIcon />
            </IconButton>
            <IconButton color='primary' aria-label='upload picture' component='span'>
              <MaleIcon />
            </IconButton>
          </div>

          <Slider
            className='py-8'
            valueLabelDisplay='auto'
            min={0}
            max={25}
            step={0.1}
            onChange={e => setWeight(e.target.value)}
          ></Slider>

          <FormLabel id='demo-row-radio-buttons-group-label'>Weight Type</FormLabel>
          <Select
            aria-labelledby='demo-row-radio-buttons-group-label'
            id='weight-type-select'
            value={weightType}
            label='Weight Type'
            onChange={e => setWeightType(e.target.value)}
          >
            <MenuItem key='lb' value='lb'>
              lb
            </MenuItem>
            <MenuItem key='kg' value='kg'>
              kg
            </MenuItem>
          </Select>
        </FormControl>
      </main>
    </div>
  );
}
