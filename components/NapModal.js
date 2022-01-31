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
import Icon from '@mui/material/Icon';

const popupStyle = {
  position: 'absolute',
  borderRadius: '15px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//--------------------------------------------------------//
//------------------Modal Window Section------------------//
//--------------------------------------------------------//

const FoodModal = () => {
  const [open, setOpen] = React.useState(false);
  const [food, setFood] = React.useState(['Formula', 'Milk', 'Mushy Peas']);
  const [foodValue, setFoodValue] = React.useState('');
  const [foodAmount, setFoodAmount] = React.useState(0);
  const [date, setDate] = React.useState(null);
  const [napTime, setNapTime] = React.useState(new Date());
  const [napDate, setNapDate] = React.useState(new Date().toString());

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
  console.log('Time', napTime);
  console.log('Date', napDate);
  // }, [foodValue, foodAmount, feedTime, feedDate]);

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
        color='success'
      >
        Add New Feed
      </Button>
      <Modal style={{ overflow: 'auto' }} open={open} onClose={toClose}>
        <Box sx={popupStyle} className='sm:w-5/5 md:w-3/5'>
          <b>{date}</b>
          <hr />
          <div className='sb-buffer'></div>
          <FormControl fullWidth noValidate>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label='Date of Nap'
                value={napDate}
                onChange={newValue => {
                  setNapDate(newValue);
                }}
                renderInput={params => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div style={{ width: '300px' }} className='place-self-center'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticTimePicker
                  value={napTime}
                  onChange={time => setNapTime(time)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div className='sb-buffer'></div>
            </div>
          </FormControl>
          <div style={{ display: 'flex' }} className='flex-col'>
            <Button
              style={{ backgroundColor: 'lightgreen', width: '50%' }}
              className='rounded-md border-2 border-emerald-400 place-self-center'
              variant='contained'
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
        </Box>
      </Modal>
    </div>
  );
};
//--------------------------------------------------------//
//--------------------------------------------------------//
//--------------------------------------------------------//

export default FoodModal;
